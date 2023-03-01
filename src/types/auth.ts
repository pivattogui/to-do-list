export type SessionProps = {
    id: string,
    name: string,
    email: string,
}

export type SessionUser = SessionProps

export const SHARED_PROPS: Array<keyof SessionProps> = ["id", "name", "email"]