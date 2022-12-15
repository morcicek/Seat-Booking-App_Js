const notOccupiedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelectBox = document.getElementById('movie');
const count = document.getElementById('count');
const film = document.getElementById('film');
const total = document.getElementById('total');
const container = document.querySelector('.container');

window.addEventListener('load', () => {
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  // get last selectedindexes, and last selected movie index and price
  displayUI();
  updateMovieInfo(price);
  // set last selected movie index and price
  // setMovieDataToStorage(movieSelectBox.selectedIndex, index);
});

const displayUI = () => {
  const selectedSeatsFromStorage = JSON.parse(
    localStorage.getItem('selectedSeats')
  );
  if (
    selectedSeatsFromStorage !== null &&
    selectedSeatsFromStorage.length > 0
  ) {
    notOccupiedSeats.forEach((seat, index) => {
      if (selectedSeatsFromStorage.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  console.log(selectedSeatsFromStorage);
};

movieSelectBox.addEventListener('change', (e) => {
  let price = e.target.value;
  updateMovieInfo(price, e);
});

const updateMovieInfo = (filmPrice) => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  // the array that keeps selected seats in according to notOccupied seats
  const seatsIndexArray = [...selectedSeats].map((seat) =>
    [...notOccupiedSeats].indexOf(seat)
  );
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexArray));
  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  film.innerText = movieSelectBox.options[
    movieSelectBox.selectedIndex
  ].innerText.slice(0, -5);
  // film.innerText = movieSelectBox.options[
  //   movieSelectBox.selectedIndex
  // ].innerText.slice(0, -5);
  total.innerText = selectedSeatCount * parseFloat(filmPrice);
};

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  updateMovieInfo(price);
});
