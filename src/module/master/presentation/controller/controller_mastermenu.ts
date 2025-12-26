    import { NextRequest, NextResponse } from "next/server"
    import { GetAllMasterMenuUseCase } from "../../application/usecase.mastermenu"
    import { MenuRepository } from "../../infrastructure/repository_menu"
import { GetParentMasterMenuUseCase } from "../../application/usecase.parent.mastermenu"
import { GetChildrenMasterMenuUseCase } from "../../application/usecase.children.mastermenu"

    export class MasterMenuController {
        private readonly usecase: GetAllMasterMenuUseCase
        private readonly usecaseParent: GetParentMasterMenuUseCase
        private readonly usecaseChildren: GetChildrenMasterMenuUseCase

        constructor() {
            const repo = new MenuRepository()
            this.usecase = new GetAllMasterMenuUseCase(repo)
            this.usecaseParent = new GetParentMasterMenuUseCase(repo)
            this.usecaseChildren = new GetChildrenMasterMenuUseCase(repo)
        }

        async listData(): Promise<NextResponse> {
            try {
                const data = await this.usecase.getAll()

                return NextResponse.json({
                    success: true,
                    data
                })
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error"

                return NextResponse.json(
                    { success: false, message },
                    { status: 500 }
                )
            }
        }
        async listDataParent(): Promise<NextResponse> {
            try {
                const data = await this.usecaseParent.getParentMenus()

                return NextResponse.json({
                    success: true,
                    data
                })
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error"

                return NextResponse.json(
                    { success: false, message },
                    { status: 500 }
                )
            }
        }
        async ListDataChildren(req:NextRequest): Promise<NextResponse>{
            const body = await req.json()
            const {ParentId} = body
            try {
                if (!ParentId) {
                    return NextResponse.json(
                        { success:false, message:"parentId is required" },
                        { status:400 }
                    )
                }
                const data = await this.usecaseChildren.getChildren(ParentId)
                return NextResponse.json({
                    success: true,
                    data
                })
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error"

                return NextResponse.json(
                    { success: false, message },
                    { status: 500 }
                )
            }
        }
    }
