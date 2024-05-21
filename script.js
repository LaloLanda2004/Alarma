let setAlarm = document.getElementById("set");
let activeAlarm = document.querySelector(".activarAlarma");
let hourInput = document.getElementById("HourInput");
let minuteInput = document.getElementById("MinuteInput");
let alarmsArray = [];
let alarmSound = new Audio(`paradise.mp3`);

let initialHour = 0,
initialMinute = 0,
alarmIndex = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

function currentTime() {
    let date = new Date ();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss;
    let watch = document.querySelector(`#watch`);
    watch.innerHTML = time;

    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) {
          if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hh}:${mm}`) {
            alarmSound.play();
            alarmSound.loop = true;
          }
        }
    });
}

//!AGREGA UN CERO AL VALOR DEL INPUT
  
const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
      inputValue = appendZero(inputValue);
    }
    return inputValue;
};
  
hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);
});
  
minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);
});
  


//! CREA EL DIV QUE CONTIENE LAS ALARMAS
  
const createAlarm = (alarmObj) => {
    //Keys from object
    const { id, alarmHour, alarmMinute } = alarmObj;
    //Alarm div
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;
  
    //checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        startAlarm(e);
      } else {
        stopAlarm(e);
    }
    });

    alarmDiv.appendChild(checkbox); //! --> agrega el checkbox
    //Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));

    alarmDiv.appendChild(deleteButton); //! --> añade un boton al div
    activeAlarm.appendChild(alarmDiv); //! --> agrega un div
};


  
//Set Alarm  GENERADOR DE ID
setAlarm.addEventListener("click", () => {
    alarmIndex += 1;
  
    //alarmObject
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    console.log(alarmObj);
    alarmsArray.push(alarmObj);
    
    createAlarm(alarmObj);
    //! cada vez que creo una alarma hace que los valores de los inputs vuelvan a 0
    // hourInput.value = appendZero(initialHour);
    // minuteInput.value = appendZero(initialMinute);
});
  
//Start Alarm
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarmsArray[index].isActive = true;
    }
};
  
//Stop alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    console.log(index)
    if (exists) {
      alarmsArray[index].isActive = false;
      alarmSound.pause();
    }
};
  
//delete alarm
const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      e.target.parentElement.parentElement.remove();
      alarmsArray.splice(index, 1);
    }
};
  
window.onload = () => {
    setInterval(currentTime, 1000);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};
  
console.log(alarmsArray)






// alarmsArray.forEach((alarm, index) => {
//     if (alarm.isActive) {
//       if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
//         alarmSound.play();
//         alarmSound.loop = true;
//       }
//     }
// });

// //! AGREGA CEROS

// const inputCheck = (inputValue) => {
//     inputValue = parseInt(inputValue);
//     if (inputValue < 10) {
//       inputValue = appendZero(inputValue);
//     }
//     return inputValue;
// };

// hourInput.addEventListener("input", () => {
//     hourInput.value = inputCheck(hourInput.value);
// });
  
// minuteInput.addEventListener("input", () => {
//     minuteInput.value = inputCheck(minuteInput.value);
// });




