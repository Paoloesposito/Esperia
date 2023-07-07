let puntiDisponibili = 60;

function aggiornaPunti(opzione) {
  const puntiDisponibiliElement = document.getElementById("puntiDisponibili");
  let punti = parseInt(puntiDisponibiliElement.textContent);
  const puntiOpzione = parseInt(opzione.dataset.punti);
  const scheda = opzione.dataset.scheda;
  const propedeutica = opzione.dataset.propedeutica;

  if (opzione.checked) {
    // Verifica se l'opzione ha un requisito propedeutico
    if (propedeutica) {
      const opzionePropedeutica = document.getElementById(propedeutica);
      if (opzionePropedeutica.checked) {
        punti -= puntiOpzione;
      } else {
        opzione.checked = false;
      }
    } else {
      punti -= puntiOpzione;
    }
  } else {
    punti += puntiOpzione;

    // Verifica se ci sono opzioni successive che dipendono dall'opzione corrente
    const opzioniSuccessive = document.querySelectorAll(`[data-propedeutica="${opzione.id}"]`);
    if (opzioniSuccessive.length > 0) {
      opzioniSuccessive.forEach(function (opzioneSuccessiva) {
        if (opzioneSuccessiva.checked) {
          punti -= parseInt(opzioneSuccessiva.dataset.punti);
          opzioneSuccessiva.checked = false;
        }
      });
    }
  }

  puntiDisponibiliElement.textContent = punti;
}

function selezionaLivello(livelloCheckbox, livelloOpzioniId) {
  const livelloOpzioni = document.getElementById(livelloOpzioniId);
  const opzioni = livelloOpzioni.getElementsByClassName("opzione");
  const puntiLivello = parseInt(livelloCheckbox.dataset.punti);

  if (livelloCheckbox.checked) {
    for (let i = 0; i < opzioni.length; i++) {
      const opzione = opzioni[i];
      opzione.disabled = false;
    }
    puntiDisponibili -= puntiLivello;
  } else {
    for (let i = 0; i < opzioni.length; i++) {
      const opzione = opzioni[i];
      if (opzione.checked) {
        puntiDisponibili += parseInt(opzione.dataset.punti);
        opzione.checked = false;
      }
      opzione.disabled = true;
    }
    puntiDisponibili += puntiLivello;
  }

  document.getElementById("puntiDisponibili").textContent = puntiDisponibili;
}

function generaElencoAbilita() {
  var elencoAbilita = document.getElementById("elencoAbilita");
  elencoAbilita.innerHTML = ""; // Pulisci il contenuto precedente dell'elemento

  var opzioniSelezionate = document.querySelectorAll(".opzione:checked");

  if (opzioniSelezionate.length > 0) {
    var listaAbilita = document.createElement("ul");

    for (var i = 0; i < opzioniSelezionate.length; i++) {
      var opzione = opzioniSelezionate[i];
      var nomeOpzione = opzione.nextElementSibling.textContent;
      var livelloOpzione = opzione.getAttribute("data-scheda");

      var elementoAbilita = document.createElement("li");
      elementoAbilita.textContent = livelloOpzione + ": " + nomeOpzione;

      listaAbilita.appendChild(elementoAbilita);
    }

    elencoAbilita.appendChild(listaAbilita);
  } else {
    elencoAbilita.textContent = "Nessuna abilità selezionata.";
  }
}

// Disattiva e deseleziona tutte le opzioni all'avvio
window.onload = function () {
  const opzioni = document.getElementsByClassName("opzione");

  for (let i = 0; i < opzioni.length; i++) {
    const opzione = opzioni[i];
    opzione.disabled = true;
    opzione.checked = false;
  }

  document.getElementById("puntiDisponibili").textContent = puntiDisponibili;
};
