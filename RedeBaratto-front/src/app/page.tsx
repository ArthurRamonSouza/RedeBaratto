import { SharedStateProvider } from "@/components/provider";
import Login from "@/app/login/components/login";

export default function Home({ Component, pageProps }) {
    return (
        <>
            <SharedStateProvider>
                <Login {...pageProps} />
            </SharedStateProvider>

            {/*{login && (<Cadastrar/>)}*/}
        </>
    )
}
