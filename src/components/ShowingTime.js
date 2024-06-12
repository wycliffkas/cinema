import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { is } from 'date-fns/locale'
import { setSelectedTime } from '../redux/features/cinema'

const ShowingTime = ({ showingTime, setWatchTime, cinemaName, movieId }) => {
  const { time } = showingTime
  const [isTimeSelected, setIsTimeSelected] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const cinema = useSelector(state => state.cinema)
  const dispatch = useDispatch()

  const selectedCinema = cinema[movieId]?.selectedCinema
  const selectedTime = cinema[movieId]?.selectedTime
  const selectedDate = cinema[movieId]?.selectedDate

  useEffect(() => {
    // Check if date is selectedDate is equal to today and disable time before current time
    const currentDate = String(new Date().getDate()).padStart(2, '0')

    if(String(selectedDate) === currentDate) {

      const currentTime = new Date().getHours()
      const showingTime = Number(time.split(':')[0])
      if(showingTime <= currentTime) {
        setIsDisabled(true)
      }
    } else {
      setIsDisabled(false)
    }
  }, [selectedDate, selectedTime])

  useEffect(() => {
    if(selectedCinema === null || selectedCinema === undefined) {
      setIsTimeSelected(true)
    } else if(!!selectedCinema && (selectedCinema !== cinemaName)) {
      setIsTimeSelected(false)
    } else if(!!selectedCinema && (selectedCinema === cinemaName)) {
      setIsTimeSelected((selectedTime === null || selectedTime === undefined) || selectedTime === time)
    }
  }, [selectedCinema, selectedTime])

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[styles.button, isTimeSelected ? styles.activeBtn : styles.unActiveBtn, isDisabled ? styles.disabledBtn : null]}
      onPress={() => setWatchTime(time)}
    >
      <Text style={[styles.text, { color: isTimeSelected ? '#5C5C5C' : '#BDBDBD' }]}>{time}</Text>
    </TouchableOpacity>
  )
}

export default ShowingTime

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 80,
    alignItems: 'center',
    borderWidth: 1,
  },

  activeBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0C4CA8',
  },
  unActiveBtn: {
    backgroundColor: '#E5E5E5',
    borderColor: '#BDBDBD',
  },
  disabledBtn: {
    backgroundColor: '#F5F5F5',
    borderColor: '#c21c19'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})