import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ModalAddWallet({ show, onHide, callback, wallet=null }) {
    const [coin, setCoin] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [seed, setSeed] = React.useState("");

    React.useEffect(()=>{
        if(wallet) {
            setCoin(wallet.coin);
            setDescription(wallet.description);
            setSeed(wallet.seed);
        }
    }, [wallet])

    return <Modal show={show} onHide={onHide}>
        <Form onSubmit={ e =>{
            e.preventDefault();
            e.stopPropagation();

            callback({ coin, description, seed });

            return false;
        }}>
        <Modal.Header closeButton>Add Wallet</Modal.Header>

        <Modal.Body>            
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={description} autoFocus required
                    placeholder="A Friendly name for your wallet"
                    onChange={ e => setDescription(e.target.value)} />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Coin / Network</Form.Label>
                <Form.Control value={coin} placeholder="BTC | ADA | ETH | ETC" required
                    onChange={ e => setCoin(e.target.value) } />
            </Form.Group>

            <Form.Group>
                <Form.Label>Seed Phrase</Form.Label>
                <Form.Control value={seed} required
                        onChange={ e => setSeed(e.target.value) } />
            </Form.Group>
        </Modal.Body>

        <Modal.Footer>
            <Button type="submit">Add</Button>
        </Modal.Footer>
        </Form>
    </Modal>
}