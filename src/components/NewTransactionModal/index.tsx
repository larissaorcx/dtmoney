import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import entradas from "../../assets/entradas.svg"
import saidas from "../../assets/saidas.svg"
import fechar from '../../assets/fechar.svg';
import { FormEvent, useState } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps{
    isOpen:boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal ({isOpen, onRequestClose}:NewTransactionModalProps){
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');

    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const[type, setType] = useState('deposit');

    async function handleCreatNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    };

    return(
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
            >
                <img src={fechar} alt="botao-fechar" />
            </button>
            <Container onSubmit={handleCreatNewTransaction}>

                <h2>Cadastrar Transação</h2>

                <input 
                placeholder="Titulo"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />

                <input 
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>

                    <RadioBox type="button"
                    isActive={type === 'deposit'}
                    activeColor="green"
                    onClick={() => (setType('deposit'))}
                    >
                        <img src={entradas} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    
                    <RadioBox type="button"
                    isActive={type === 'withdraw'}
                    activeColor="red"
                    onClick={() => (setType('withdraw'))}
                    >
                        <img src={saidas} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input 
                placeholder="Categoria"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>

            </Container>
        </Modal>
    );
}