import * as CryptoJS from "crypto-js";

class Block {
    public index :number;
    public hash : string;
    public prevHash : string;
    public data : string;
    public timeStamp : number;

    static calculateHash = 
    (   
        index:number ,
        prevHash : string ,
        timeStamp : number , 
        data : string):string=> CryptoJS.SHA256(index + prevHash + timeStamp + data).toString();

    static validateStructure = (aBlock :Block) : boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.prevHash==="string" && 
        typeof aBlock.timeStamp === "number" &&
        typeof aBlock.data === "string" 
    
    constructor(index :number , hash:string , prevHash :string , data:string , timeStamp:number) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = timeStamp;

    }
}


const genesisBlock : Block = new Block(0 , "2202020202020" , "" , "hello" , 12455);

let blockChain : Block[] = [genesisBlock];

const getBlockChain = () : Block[] => blockChain;

const getLatestBlock = () : Block => blockChain[blockChain.length -1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data:string) : Block => {
    const prevBlock :Block = getLatestBlock();
    const newIndex : number = prevBlock.index + 1;
    const nextTimeStamp : number = getNewTimeStamp();
    const nextHash : string = Block.calculateHash(newIndex , prevBlock.hash , nextTimeStamp , data);
    const newBlock :Block = new Block(newIndex , nextHash , prevBlock.hash , data, nextTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock :Block):string => Block.calculateHash(aBlock.index , aBlock.prevHash , aBlock.timeStamp , aBlock.data);
const isBlockValid = (candidateBlock : Block , prevBlock:Block) : boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if(prevBlock.index +1 !==candidateBlock.index ){
        return false;
    } else if (prevBlock.hash !== candidateBlock.prevHash){
        return false
    } else if( getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false
    } else {
        return true;
    }
};
const addBlock = (candidateBlock : Block) :void => {
    if(isBlockValid(candidateBlock , getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockChain);
export {};