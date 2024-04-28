'use client';
import Login from "@/app/login/components/login";
import Produtos from "@/app/produtos/produtos";

export default function Home() {
    const pageData = JSON.parse(localStorage.getItem('data'));
    console.log(pageData);
    return (
        <>
            {pageData ? <Produtos/> : <Login/>}
        </>
    )
}
