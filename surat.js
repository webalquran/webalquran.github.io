function getURL(e) {
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++) {
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e) {
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response => {

        const titleSurat = document.querySelector('#title-surat');
        titleSurat.textContent =`Surat ${response.nama_latin}`

        const judulSurat = document.querySelector('.judul-surat');
        const cardjudulSurat = `
            <strong>${response.nama_latin} - ${response.nama}</strong>
                <p>Jumlah Ayat: ${response.jumlah_ayat} (${response.arti})</p>
                <button class="btn btn-primary audio-button-play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                    Play Audio
                    </button>

                    <button class="btn btn-danger hidden-button audio-button-pause">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
                    </svg>
                    Stop
                    </button>
                    <audio id="audio-tag" src="${response.audio}"></audio>
                    `;
                    judulSurat.innerHTML = cardjudulSurat;

        const surat = response.ayat;
        let isiSurat = '';
        surat.forEach( s => {
            isiSurat += `
                <div class="card mb-3 ">
                <div class="card-body">
                    <p>${s.nomor}</p>
                    <h2 class="text-end mb-2">${s.ar}</h2>
                    <p>${s.tr}</p>
                    <p>${s.idn}</p>
                </div>
            </div>
            `;
            
        });

        const cardIsiSurat = document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML = isiSurat;

        const buttonPlay= document.querySelector('.audio-button-play');
        const buttonPause= document.querySelector('.audio-button-pause');
        const audioSurat = document.querySelector('#audio-tag');

        //play
        buttonPlay.addEventListener('click', function () {
            buttonPlay.classList.add('hidden-button');
            buttonPause.classList.remove('hidden-button');
            audioSurat.play();
        });

        //pause
        buttonPause.addEventListener('click',function(){
            buttonPause.classList.add('hidden-button');
            buttonPlay.classList.remove('hidden-button');
            audioSurat.pause();

        });
    });
}

getSurat();