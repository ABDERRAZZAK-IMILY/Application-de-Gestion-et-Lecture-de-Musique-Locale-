import { Injectable, signal, computed, effect } from '@angular/core';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio = new Audio();
  
  currentTrack = signal<Track | null>(null);
  isPlaying = signal(false);
  currentTime = signal(0);
  duration = signal(0);
  volume = signal(0.5);

  isLoading = signal(false);

  constructor() {
    this.audio.volume = this.volume();
    
    this.audio.ontimeupdate = () => {
      this.currentTime.set(this.audio.currentTime);
    };

    this.audio.onended = () => {
      this.isPlaying.set(false);
      this.currentTime.set(0);
    };

    this.audio.onloadedmetadata = () => {
      this.duration.set(this.audio.duration);
      this.isLoading.set(false);
      this.playAudio();
    };
    
    this.audio.onwaiting = () => this.isLoading.set(true);
    this.audio.oncanplay = () => this.isLoading.set(false);
  }

  
  playTrack(track: Track) {
    if (this.currentTrack()?.id === track.id) {
      this.togglePlay();
      return;
    }

    this.isLoading.set(true);
    this.currentTrack.set(track);
    
    if (track.audioFile) {
      const url = URL.createObjectURL(track.audioFile);
      this.audio.src = url;
      this.audio.load();
    }
  }

  togglePlay() {
    if (this.audio.paused) {
      this.playAudio();
    } else {
      this.pauseAudio();
    }
  }

  private playAudio() {
    this.audio.play()
      .then(() => this.isPlaying.set(true))
      .catch(err => console.error('Error playing audio:', err));
  }

  private pauseAudio() {
    this.audio.pause();
    this.isPlaying.set(false);
  }

  seekTo(seconds: number) {
    this.audio.currentTime = seconds;
    this.currentTime.set(seconds);
  }

  setVolume(vol: number) {
    this.volume.set(vol);
    this.audio.volume = vol;
  }


   isclicked = signal<boolean>(false);
}