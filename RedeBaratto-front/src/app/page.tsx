export default function Home() {
    return (
        <>
            {login && (<Cadastrar/>)}
            <Login/>
        </>
    )
}
