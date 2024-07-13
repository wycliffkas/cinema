# Cinemax

Cinemax is a React Native Expo application that allows users to view new movies, watch trailers, book cinema seats, pay for bookings using mobile money, generate tickets, and view their tickets.

## Features

- **View New Movies**: Browse the latest movies available in cinemas.
- **Watch Trailers**: Watch trailers of the movies.
- **Book Cinema Seats**: Select and book seats for your favorite movies.
- **Pay for Bookings**: Make payments for your bookings using mobile money.
- **Generate Tickets**: Get digital tickets for your booked movies.
- **View Tickets**: Access and view your tickets anytime.

## Technologies Used
- **React Native:** For building the mobile application.
- **Expo:** For a streamlined development workflow.
- **React Navigation:** For handling navigation within the app.
- **Axios:** For making API requests.
- **Redux:** For state management.
- **Reanimated:** For creating smooth animations.

## Screenshots

[Watch the demo video on Vimeo](https://player.vimeo.com/video/983612758?h=6bc6c098c3)

## Installation

1. **Clone the repository**:

   ```bash
   https://github.com/wycliffkas/cinema.git
   ```

2. **Change directory to the project folder**:
   ```bash
   cd cinema
   ```

3. **Install dependencies**:
   ```bash
   yarn
   ```

3. **Install Expo CLI globally** (if you haven't already):
   ```bash
   npm install -g expo-cli
   ```

## Setup

Create a .env file in the root of your project and add the moviedb api key.
   ```bash
   EXPO_PUBLIC_API_KEY=your_themoviedb_api_key
   ```


## Running the Application


1. **Clone the repository**:
   ```bash
   yarn start
   ```

2. **Run on your device**:
    - **Using Expo Go:**
      - Download the Expo Go app from the Google Play Store or Apple App Store.
      - Scan the QR code generated in your terminal with the Expo Go app.
    - **Using an Android/iOS Emulator:**
      - Make sure you have an Android or iOS emulator installed and running.
      - Press a (for Android) or i (for iOS) in your terminal to open the app in the emulator.
