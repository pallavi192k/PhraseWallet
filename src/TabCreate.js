import React from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalAddWallet from './ModalAddWallet';
import crypto from 'crypto';

export default function TabCreate(){
    const [wallets, setWallets] = React.useState([]);
    const [name, setName] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    
    const parseFile = React.useCallback( contents =>{
        try {
            const [iv, encrypted] = contents.split("\n");
            
            let secret = window.prompt("The Secret to Encrypt the File ! Write it Down, is the Only way to reverse the encryption !!!");
            if(!secret || secret.length <=0) {
                window.alert("Secret Invalid !!!");
                return;
            }

            if(secret.length < 32 ) {
                // Filling the secret to the minimum 32 size.
                secret = iv.toString('hex').substring(0, 32-secret.length) + secret;
            }

            const decipher = crypto.createDecipheriv('aes-256-cbc', secret, Buffer.from(iv, 'hex'));
            const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
            const decrpytedJson = JSON.parse(Buffer.from(decrpyted, "hex").toString());
            console.log("## decrpyted", decrpytedJson);
            setName(decrpytedJson.name || "");
            setWallets(decrpytedJson.wallets || []);
        } catch(E) {
            window.alert("Decrypt Fail:" + E);
            console.log("Decrypt Fail:", E);
        }
    }, []);

    return <Form className='form'>
    
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={ e => setName(e.target.value) } />
        </Form.Group>

        <Table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Coin / Network</th>
                    <th>Seed</th>
                    <th>#</th>
                </tr>
            </thead>

            <tbody>
                { (wallets || []).map( (wallet, idx) => {
                    return <tr key={idx}>
                        <td>{wallet.description}</td>
                        <td>{wallet.coin}</td>
                        <td>{wallet.seed}</td>
                        <td>
                            <Button variant="danger" title="Delete">X</Button>
                        </td>
                    </tr>
                }) }
            </tbody>
        </Table>

        <Form.Group>
            <Form.Label>Actions</Form.Label>
            <div className="">
                <Button className="me-2" variant="secondary" 
                    disabled={wallets.length <= 0} onClick={()=>{
                        try {
                            let secret = window.prompt("The Secret to Encrypt the File ! Write it Down, is the Only way to reverse the encryption !!!");
                            if(!secret || secret.length <=0) {
                                window.alert("Secret Invalid !!!");
                                return;
                            }

                            // https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/
                            // https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
                            const iv = crypto.randomBytes(16);

                            if(secret.length < 32 ) {
                                if(!window.confirm(`"Your secret is too short [${secret.length}] ! Recomended Length is 32+. Would like to continue ?"`)) return;
                                // Filling the secret to the minimum 32 size.
                                secret = iv.toString('hex').substring(0, 32-secret.length) + secret;
                            }

                            const cipher = crypto.createCipheriv('aes-256-cbc', secret, iv);
                            const encrypted = Buffer.concat([cipher.update(JSON.stringify({ name, wallets })), cipher.final()]);

                            // https://stackoverflow.com/questions/28464449/how-to-save-json-data-locally-on-the-machine
                            var a = document.createElement('a');
                            a.setAttribute('href', 'data:text/plain;charset=utf-8,'+ iv.toString('hex') + "\n" + encrypted.toString('hex'));
                            a.setAttribute('download', "lhwallet"+ (new Date()).getTime() + ".txt");
                            a.click()
                        } catch(E) {
                            window.alert("Encrypt Fail:" + E);
                            console.log("Encrypt Fail:", E);
                        }
                    }}>Generate File</Button>

                <Button variant="danger" className="me-2" 
                    disabled={wallets.length <= 0} onClick={()=>{
                    if(!window.confirm("!!! DANGER !!! You will download the Wallets in Plain Text. Your Money Can be stolen if you lose this file. Do at your own risk !"));

                    var a = document.createElement('a');
                    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+ JSON.stringify({ name, wallets}, null, 4));
                    a.setAttribute('download', "lhwallet"+ (new Date()).getTime() + ".json");
                    a.click()
                }}>Download as JSON</Button>

                <Button className="me-2" variant="warning" onClick={()=>{
                    if(wallets.length > 0) {
                        if(!window.confirm("Restoring a wallet will replace the data in the form. Would you like to continue ?")) return;
                    }

                    var f = document.createElement('input');
                    f.setAttribute('type', 'file');
                    f.addEventListener('change', e => {
                        var reader = new FileReader();
                        reader.onload = function(){
                            parseFile(Buffer.from(reader.result).toString());
                        };
                        reader.readAsText(e.target.files[0]);
                    });

                    f.click();
                }}>Restore from File</Button>

                <Button className="float-end" variant="primary" onClick={()=>{
                    setShowModal(true);
                }}>Add Wallet</Button>
            </div>
        </Form.Group>

        { showModal ? <ModalAddWallet show={showModal} onHide={setShowModal} callback={ wallet =>{
            const wallets2 = [...wallets];
            wallets2.push(wallet);
            setWallets(wallets2);
            setShowModal(false);
        }} /> : false }
    </Form>
}