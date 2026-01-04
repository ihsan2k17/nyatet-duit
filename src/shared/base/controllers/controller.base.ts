import { NextResponse } from "next/server";
import { Result } from "@/shared/types/result";

export abstract class BaseController{

    
    protected async ExecuteController<T>(
        usecase:() => Promise<Result<T>>
    ) {
        
        try {
            const res = await usecase()
            console.log("data cntrl: ",res)
            if(res.status === false) {
                return NextResponse.json({success: false, message:res.message},{status:404})
            }
            if(res.data !== undefined) {
                return NextResponse.json({success:true, message: null, data: res.data},{status:200})
            } else {
                return NextResponse.json({success:false, message: res.message, data:null},{status:200})
            }
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
}