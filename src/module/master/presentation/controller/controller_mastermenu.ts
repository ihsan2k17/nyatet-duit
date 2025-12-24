    import { NextResponse } from "next/server"
    import { GetAllMasterMenuUseCase } from "../../application/usecase.mastermenu"
    import { MenuRepository } from "../../infrastructure/repository_menu"

    export class MasterMenuController {
        private readonly usecase: GetAllMasterMenuUseCase

        constructor() {
            const repo = new MenuRepository()
            this.usecase = new GetAllMasterMenuUseCase(repo)
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
    }
