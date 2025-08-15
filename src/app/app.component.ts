import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wedding-mm';
  isPlaying = false;
  private audio: HTMLAudioElement | null = null;

  constructor() {
    // Initialize audio when component loads
    this.initializeAudio();
  }

  ngOnInit() {
    // Try to start music automatically after a short delay
    setTimeout(() => {
      this.startAutoPlay();
    }, 1000);
  }

  initializeAudio() {
    // Create audio element for wedding music
    this.audio = new Audio();
    this.audio.src = 'assets/wedding-music.mp3'; // You can add your music file here
    this.audio.loop = true;
    this.audio.volume = 0.3; // Set to 30% volume
  }

  startAutoPlay() {
    if (!this.audio) return;

    this.audio.play().then(() => {
      this.isPlaying = true;
      console.log('Music started automatically');
    }).catch(error => {
      console.log('Autoplay was prevented by browser:', error);
      // Fallback: music will be available via button click
    });
  }

  toggleMusic() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play().catch(error => {
        console.log('Audio playback failed:', error);
        // Fallback for browsers that block autoplay
      });
      this.isPlaying = true;
    }
  }

  openDirections() {
    // Function to open Google Maps directions
    const destination = 'نادي الشرطة حدائق أكتوبر';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  }
}
