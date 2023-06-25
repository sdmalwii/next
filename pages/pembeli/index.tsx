import axios from 'axios';
import { useState,useEffect } from "react";
import { stat } from "fs";
import Link from 'next/link';

// const client = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com/posts"
// });

const koneksiParfum = axios.create({
   baseURL: "http://127.0.0.1:5000/api/Parfum"
 }); 

export default function FormParfum() {
    const [parfum, setParfum] =  useState(null);
    const [kode_barang, setKode_barang] = useState("");
    const [nama_pembeli, setNama_pembeli] = useState("");
    const [tanggal_beli, setTanggal_beli] = useState("2018-07-22");
    const [nama_parfum, setNama_parfum] = useState("");
    const [foto, setFoto] = useState("");
    const [ml, setMl] = useState("");
    const [harga, setHarga] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
 
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
 
      return [year, month, day].join('-');
  }

  const handleSubmitAdd =  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiParfum
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });    
 }

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = "/"+event.target.kode_barang.value;
      alert(address);
  //const formData = new FormData(event.target);
    const formData = {
      kode_barang: event.target.kode_barang.value,
      nama_pembeli: event.target.nama_pembeli.value,
      tanggal_beli: event.target.tanggal_beli.value,
      nama_parfum: event.target.nama_parfum.value,
      ml: event.target.ml.value,
      harga: event.target.harga.value
      }

  alert(formData);
  koneksiParfum
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

    const handleAdd = (event) => {
      setAdd("show");
      setbtnAdd("hide");
      setEdit("hide");   
}

    const handleCancelAdd = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
}

    const handleCancelEdit = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
      setKode_barang("");
      setNama_pembeli("");
      setTanggal_beli(formatDate("2018-07-22"));
      setNama_parfum("");
      setFoto("");
      setMl("");
      setHarga("");
}

    const handleDelete = (event) => {
      event.preventDefault();
      var kode_barang = event.target.value;
      koneksiParfum.delete(`/${kode_barang}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
          setParfum(
            parfum.filter((parfum) => {
               return parfum.kode_barang !== kode_barang;
            }))
       
          // Lakukan langkah-langkah lain setelah penghapusan data
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
    })
  }

      const handleEdit = (event) => {
        event.preventDefault();
        var kode_barang = event.target.value;
 
              const prEdit =  parfum.filter((parfum) => {
                   return parfum.kode_barang == kode_barang;
        });
                    if(prEdit!=null){
                      setKode_barang(prEdit[0].kode_barang);
                      setNama_pembeli(prEdit[0].nama_pembeli );
                      setTanggal_beli(formatDate(prEdit[0].tanggal_beli));
                      setNama_parfum(prEdit[0].nama_parfum);
                      setFoto(prEdit[0].foto);
                      setMl(prEdit[0].ml);
                      setHarga(prEdit[0].harga);
                      setAdd("hide");
                      setbtnAdd("hide");
                      setEdit("show");
          }
        }

    useEffect(() => {
      async function getParfum() {
        const response = await koneksiParfum.get("/").then(function (axiosResponse) {
            setParfum(axiosResponse.data.data);
         })
         .catch(function (error) {
         
          alert('error from parfum in api parfum: '+error);
         });;
          }
      getParfum();
    }, []);

  if(!parfum) {
    return (

      <div><center><h1>Tunggu yaa</h1></center></div>

    )
  }

  else{
    return (

      <center>
      <div className="button-pembeli">
      <button className="back-pembeli"><Link href="/">Kembali</Link></button>

      </div>
      <h1 style={{fontFamily: "Comic Sans MS",
                color:"black", 
                }}>Al-Alwi Perfume</h1>
      <p><i>Jl. Matraman No.6</i></p><br></br>

      <div>
      <title>Sadham Alwie_21570006</title>
      <button id="btnadd" onClick={handleAdd} className={statebutonadd} 
              style={{backgroundColor: "#32a877",
                      color:"white",
                      borderWidth:"1px",
                      padding:"13px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Tambah</button>

{/* Buat form Pembelian */}
       <form id="formadd-pembeli" className={stateadd} onSubmit={handleSubmitAdd}><br></br>
       <h2 style={{color:"white"}}>Form Pembelian</h2><br></br>

        <table border={0}>
            <tbody style={{color:"white",padding:"3px"}}>
        
        <tr>
            <td><label> Kode Barang : </label></td>
            <td><input type="text" id="kode_barang" name="kode_barang"/></td>
        </tr> 

        <tr>
            <td><label> Nama Pembeli : </label></td>
            <td><input type="text" id="nama_pembeli" name="nama_pembeli"/></td>
        </tr> 

        <tr>
            <td><label> Tanggal Beli:</label></td>
            <td><input type="date" name="tanggal_beli"
            min="1970-01-01" max="2025-12-31"/></td>
        </tr> 

        <tr>
            <td><label> Nama Parfum : </label></td>
            <td><input type="text" id="nama_parfum"   name="nama_parfum"/></td>
        </tr> 
        
        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr> 

        <tr>
            <td><label> Ml : </label></td>
            <td><input type="text" id="ml" name="ml"/></td>
        </tr> 

        <tr>
            <td><label> Harga : </label></td>
            <td><input type="text" id="harga" name="harga"/></td>
        </tr> 
        
        <br ></br>

            </tbody>
        </table>

{/* buat tombol submit yang ada di form pembelian*/}
          <input type="submit"  
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                        }}/>

|

{/* buat tombol cancel yang ada di form pembelian*/}
          <input type="button" value="cancel" onClick={handleCancelAdd} 
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form>  
      
 
{/* Buat form Edit */}
<form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}><br></br>
          <h2 style={{color:"white"}}>Form Edit</h2><br></br>

        <table>
              <tbody style={{color:"white"}}>
        <tr>
            <td><label> Kode Barang : </label></td>
            <td><input type="text" id="kode_barang"  value={kode_barang} name="kode_barang"/></td>
        </tr>

        <tr>
            <td><label> Nama Pembeli : </label></td>
            <td><input type="text" id="nama_pembeli"  value={nama_pembeli} name="nama_pembeli"
               onChange={(e) => setNama_pembeli(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Tanggal Beli:</label></td>
            <td><input type="date" value={tanggal_beli} name="tanggal_beli"  onChange={(e) => setTanggal_beli(e.target.value)}
            min="1970-01-01" max="2025-12-31"/></td>
        </tr>

        <tr>
            <td><label> Nama Parfum : </label></td>
            <td><input type="text" id="nama_parfum"  value={nama_parfum} name="nama_parfum"
               onChange={(e) => setNama_pembeli(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Foto : </label></td>
            <td><img src={foto} width="80"/></td>
        </tr>

        <tr>
            <td><label> Ml : </label></td>
            <td><input type="text" id="ml"  value={ml} name="ml"
               onChange={(e) => setMl(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Harga : </label></td>
            <td><input type="text" id="harga"  value={harga} name="harga"
               onChange={(e) => setHarga(e.target.value)}/></td> 
        </tr>
        
        <br ></br>

              </tbody>
          </table>

{/* buat tombol submit yang ada di form Edit*/}
          <input type="submit" 
                style={{padding:"3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                        }}/>

|

{/* buat tombol cancel yang ada di form Edit*/}
          <input type="button" value="cancel" onClick={handleCancelEdit}  
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form><br/><br/>
      
        <h3 style={{fontFamily:"times" }}>Tabel List Pembeli</h3>
          
          <table className='dekorasi'>
              <thead>
                <tr>         
                <th>Kode Barang</th>
                <th>Nama Pembeli</th>
                <th>Tanggal Beli</th>
                <th>Nama Parfum</th>
                <th>Foto</th>
                <th>Ml</th>
                <th>Harga</th>
                <th colSpan={2}>Opsi</th>
                </tr>
              </thead>
      
              <tbody>
              {parfum.map((pr) =>
                  <tr style={{textAlign:'center'}}> 
                    <td>{pr.kode_barang}</td>
                    <td>{pr.nama_pembeli}</td>
                    <td>{pr.tanggal_beli}</td>
                    <td>{pr.nama_parfum}</td>
                    <td><img src={pr.foto} width="120"/></td>
                    <td>{pr.ml}</td>
                    <td>{pr.harga}</td>

{/* buat tombol edit */}
          <td><button onClick={handleEdit} value={pr.kode_barang} 
              style={{backgroundColor: "#e2e83f",
                      color:"white",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Edit</button></td>

{/* buat tombol hapus */}
          <td><button onClick={handleDelete} value={pr.kode_barang}
              style={{backgroundColor: "#ed3e3e",
                      color:"white",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Hapus</button></td>

                  </tr>
              )}
              </tbody>
            </table>
      
            </div>
            </center>
          )
  }
  }