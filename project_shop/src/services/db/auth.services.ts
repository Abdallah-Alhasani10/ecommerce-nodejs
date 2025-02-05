import { Role, User } from '@prisma/client';
import bcrypt from 'bcrypt'
import { prisma } from '../../prisam';
import JWT from'jsonwebtoken'
import { BAD_REQUST_EXCEPTION } from '../../globals/middlware/error.middlware';

class AuthServices{
    
    public async addUser(requsetBody:any){
        const{email,password,firstName,lastName,avatar,role}=requsetBody;
        const hashpassword:string=await bcrypt.hash(password,10)
        const newUser:User=await prisma.user.create({
            data:{
                email,
                password:hashpassword,
                firstName,
                lastName,
                avatar,
                role
            }
        })
        const payload={email,firstName,lastName,avatar,role:newUser.role,id:newUser.id}
        const accessToken:string=await this.generateJWT(payload);
        return accessToken
    }
    public async login(requestBody: any) {
        const { email, password } = requestBody; 
        const user: User | null = await this.getUserByEmail(email);
        if (!user) { 
            throw new BAD_REQUST_EXCEPTION("Invalid Credentials");
        }
        const isMatchPassword: boolean = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            throw new BAD_REQUST_EXCEPTION("Invalid Credentials");
        }
        const payload = {
            email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            role: user.role,
            id: user.id
        };
    
        const accessToken: string = await this.generateJWT(payload);
        return accessToken; 
    }
    public async geti(currentuser:any) {
        const useri=await prisma.user.findFirst({
            where:{
                id:currentuser.id
            }
        })
        return useri
    }
    
    private async getUserByEmail(email:string){
        return await prisma.user.findFirst({
            where:{
                email
            }
        })
    }
    private async generateJWT(payload:any){
        return JWT.sign(payload,process.env.JWT_SECRET!,{expiresIn:'1d'})
    }
    public async isEmailAlreadyExist(email:string){
        const userByEmail=await prisma.user.findFirst({
            where:{
                email
            }
        })
        return userByEmail !=null
    }
    public async getAlluser(){
        const users=await prisma.user.findMany()
        return users
    }
}
export const authservices:AuthServices=new AuthServices()