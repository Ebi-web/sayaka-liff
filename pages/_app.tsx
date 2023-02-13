import "../styles/globals.css";
import type {AppProps} from "next/app";
import type {Liff} from "@line/liff";
import {useState, useEffect} from "react";
import {UserService} from "../api/user";
import {clearExpiredIdToken} from "../liff/liff";

const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;

function MyApp({Component, pageProps}: AppProps) {
    const [liffObject, setLiffObject] = useState<Liff | null>(null);
    const [liffError, setLiffError] = useState<string | null>(null);
    clearExpiredIdToken(liffId)

    // Execute liff.init() when the app is initialized
    useEffect(() => {
        // to avoid `window is not defined` error
        import("@line/liff")
            .then((liff) => liff.default)
            .then((liff) => {
                console.log("LIFF init...");
                liff
                    .init({liffId: liffId})
                    .then(() => {
                        console.log("LIFF init succeeded.");
                        if (navigator.userAgent.indexOf("Chrome") === -1 && navigator.userAgent.indexOf("Firefox") === -1 && navigator.userAgent.indexOf("Safari") === -1 && navigator.userAgent.indexOf("Edge") === -1) {
                            liff.openWindow({
                                url: "https://liff.line.me/1657852059-xjNVM5rk",
                                external: true,
                            });
                        }
                        setLiffObject(liff);
                        if (!liff.isLoggedIn()) {
                            liff.login();
                        }
                    })
                    .catch((error: Error) => {
                        console.log("LIFF init failed.");
                        setLiffError(error.toString());
                    });
            });
    }, []);

    useEffect(() => {
        if (liffObject) {
            UserService.register(liffObject.getAccessToken()!).then(() => {
            }).catch(e => {
                console.log(e);
                throw e;
            })
        }
    }, [liffObject])

    // Provide `liff` object and `liffError` object
    // to page component as property
    pageProps.liff = liffObject;
    pageProps.liffError = liffError;
    return <Component {...pageProps} />;
}

export default MyApp;
