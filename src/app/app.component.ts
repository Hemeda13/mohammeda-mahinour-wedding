import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wedding-mm';
  isPlaying = false;
  showAutoplayPrompt = false;
  private audio: HTMLAudioElement | null = null;
  private hasUserInteracted = false;

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

  // Listen for any user interaction to enable autoplay
  @HostListener('document:click', [])
  @HostListener('document:touchstart', [])
  @HostListener('document:keydown', [])
  onUserInteraction() {
    if (!this.hasUserInteracted && !this.isPlaying) {
      this.hasUserInteracted = true;
      this.startAutoPlay();
    }
  }

  initializeAudio() {
    // Create audio element for wedding music
    this.audio = new Audio();
    this.audio.src = 'assets/wedding-music.mp3';
    this.audio.loop = true;
    this.audio.volume = 0.3; // Set to 30% volume
    this.audio.preload = 'auto';

    // Add event listeners
    this.audio.addEventListener('canplaythrough', () => {
      console.log('Audio is ready to play');
      if (!this.isPlaying) {
        this.startAutoPlay();
      }
    });
  }

  startAutoPlay() {
    if (!this.audio) return;

    // Multiple autoplay attempts
    const attemptPlay = (attempt: number = 1) => {
      if (attempt > 3) {
        console.log('All autoplay attempts failed, showing manual controls');
        this.showAutoplayPrompt = true;
        return;
      }

      console.log(`Autoplay attempt ${attempt}`);
      const playPromise = this.audio!.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true;
          this.showAutoplayPrompt = false;
          console.log(`Music started automatically on attempt ${attempt}`);
        }).catch(error => {
          console.log(`Autoplay attempt ${attempt} failed:`, error);
          // Try again after a delay
          setTimeout(() => attemptPlay(attempt + 1), attempt * 500);
        });
      }
    };

    attemptPlay();
  }

  enableMusic() {
    this.showAutoplayPrompt = false;
    this.hasUserInteracted = true;
    this.startAutoPlay();
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
