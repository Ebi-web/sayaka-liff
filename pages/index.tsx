import type {Liff} from "@line/liff";
import type {NextPage} from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {FlashCardService} from "../api/flash_card";
import {useEffect, useState} from "react";
import {Box, Button, Container, IconButton, Input, Modal, Typography} from "@mui/material";
import BasicTable from "../components/book/table";
import {FlashCard} from "../model/flash-card";
import LoupeIcon from '@mui/icons-material/Loupe';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
                                                                             liff,
                                                                             liffError
                                                                         }) => {
    const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [japanese, setJapanese] = useState<string>("");
    const [english, setEnglish] = useState<string>("");

    const handleOpen = () => {
        setIsOpen(true);
    };

    const submitForm = () => {
        if (!english || !japanese) {
            return;
        }
        if (!liff) {
            return;
        }
        (new FlashCardService({liff})).create({front: english, back: japanese}).then(() => {
        //    reload the page
            setJapanese("");
            setEnglish("");
            window.location.reload();
        }).catch(e => {
            console.log(e);
            throw e;
        })
    };

    useEffect(() => {
        if (liff) {
            (new FlashCardService({liff})).index().then(r => {
                if (!(r.data instanceof Array)) {
                    return
                }
                setFlashCards(r.data);
            })
        }
    }, [liff]);


    return (
        <div>
            <Head>
                <title>Sayaka</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Sayaka</h1>
                <p>?????????????????????</p>
                <p>Sayaka?????????????????????????????????????????????????????????????????????</p>
                <IconButton aria-label="plus" size="large" color={"secondary"} onClick={handleOpen}>
                    <LoupeIcon fontSize="large"/>
                </IconButton>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpen}
                    onClose={submitForm}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ??????????????????????????????
                        </Typography>
                        <Input placeholder="car" inputProps={{"aria-label": "description"}} value={english}
                               onChange={(e) => setEnglish(e.target.value)}/>
                        <Input placeholder="???" inputProps={{"aria-label": "description"}} value={japanese}
                               onChange={(e) => setJapanese(e.target.value)}/>
                        <Button onClick={submitForm}>??????</Button>
                    </Box>
                </Modal>
                {liff && (
                    <>
                        <Container maxWidth="sm">
                            <BasicTable headers={['??????', '?????????']} rows={flashCards}/>
                        </Container>
                    </>
                )}
                {liffError && (
                    <>
                        <p>Sorry...</p>
                        <p>
                            <code>Sayaka?????????????????????????????????????????????????????????????????????????????????????????????</code>
                        </p>
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
