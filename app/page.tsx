'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
type FileDataProps ={
  [index: number]: number | string;

  "First Name": string;
  "Last Name": string;
}
export default function Home() {
 
  const [excelFile, setExcelFile] = useState<String | ArrayBuffer | null | undefined>(null);
  const [excelFileError, setExcelFileError] = useState<null| String>(null);
  const [excelFileData, setExcelFileData] = useState<null| FileDataProps[]>(null);
  const [nameData,setNameData] = useState<String[] | null>(null);
 
 
 
  const FileType = "application/vnd.ms-excel";
 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    let selectedFiles = e.target.files[0];
    if(selectedFiles){
      if(selectedFiles&&FileType.includes(selectedFiles.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFiles);
        reader.onload= (e) => {
          setExcelFileError(null);
          setExcelFile(e.target?.result);
        }
 
 
      }
    } else{
      setExcelFileError("Please select excel file");
      setExcelFile(null);
    }
 
  }
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:"buffer"});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      
      setExcelFileData(data as FileDataProps[]);
      
      
 
    }else {
      setExcelFileData(null);
    }
 
  }
  console.log(excelFileData);
  console.log(excelFileError);
  let temp:String[] = [];   //Get Any pre-stored items
  useEffect(()=>{
    if(excelFileData){

      excelFileData.map((row,index)=>{

    temp.push(row["First Name"]);
          console.log(row["First Name"]);
    })
    }
    setNameData(temp);
  },[excelFileData])
  console.log(nameData);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <form autoComplete="off" onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} required/>
      <button type="submit">Submit</button>
 
     </form>
    </main>
  );
}
 