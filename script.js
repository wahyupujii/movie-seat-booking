const seats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count");
const total = document.getElementById("total");
const booking = document.getElementById("pesan");
const hargaFilm = parseInt(document.querySelector("p[data-target]").getAttribute("data-target"));

let pesan = 0;
let jumlah = 0;
let index = [];


const ambilData = () => {
    const kursiDipesan = JSON.parse(localStorage.getItem('indexKursiDipesan'));
    if (kursiDipesan !== null && kursiDipesan.length >= 0) {
        seats.forEach((seat , index) => {
            if (kursiDipesan.indexOf(index+1) > -1) {
                seat.classList.add('dipesan');
            }
        })
        return kursiDipesan;
    } else {
        let array = [];
        localStorage.setItem('indexKursiDipesan' , JSON.stringify(array))
    }
}

ambilData();

seats.forEach(function (seat){
    seat.addEventListener("click" , function(el){

        if ( this.classList.contains("selected") ){
            this.classList.remove("selected");

            pesan--;
            count.innerText = pesan;

            let indexBatalPesan = $(".seat").index(seat)-2;

            index = index.filter(function (element) {
                return element !== indexBatalPesan;
            })   
        } 

        else if ( this.classList.contains("dipesan") ) {
            alert("Kursi ini sudah dipesan , tidak dapat dipilih");
        }

        else {
            this.classList.add("selected");

            if ($(".seat").index(this)-2 > 0) {
                index.push($(".seat").index(this)-2)
            }

            pesan++;
            count.innerText = pesan;
        }

        jumlah = pesan * hargaFilm;

        let reverse = jumlah.toString().split("").reverse().join(""),
            ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join(".").split("").reverse().join("");

        total.innerText = ribuan;
    })  
})

booking.addEventListener('click' ,  function (el) {
    let array = ambilData();    
    let hasil = array.concat(index).sort((a, b) => a - b);    
    localStorage.setItem('indexKursiDipesan' , JSON.stringify(hasil));

})
