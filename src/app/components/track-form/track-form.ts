import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackService } from '../../services/track';
import { Track } from '../../models/track.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css'
})
export class TrackFormComponent {

  fb = inject(FormBuilder);

  trackService = inject(TrackService);
  router = inject(Router);

  trackForm = new FormGroup({
    title: this.fb.control('', [Validators.required , Validators.maxLength(50)]),
    description: this.fb.control('', [Validators.maxLength(200)]),
    artist: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
  });

  isSubmitting = signal<boolean>(false);

  audioDuration = signal<number>(0);

  selectedAudioFile : File | null = null;



onAudioSelected(event: any) {
  const file: File = event.target.files[0];
  if (!file) return;

  this.selectedAudioFile = file;

  const audio = new Audio();
  const reader = new FileReader();

  audio.src = URL.createObjectURL(file);
  audio.onloadedmetadata = () => {
    this.audioDuration.set(Math.floor(audio.duration));
    URL.revokeObjectURL(audio.src);
  };
}

  onCoverSelected(event: any) {




  }


  onSubmit(){

       if (!this.trackForm.valid || !this.selectedAudioFile) return;

    this.isSubmitting.set(true);

     const newTrack: Track = {
      id: crypto.randomUUID(),
      title: this.trackForm.value.title || '',
      description: this.trackForm.value.description || '',
      artist: this.trackForm.value.artist || '',
      genre: this.trackForm.value.genre || '',
      audioFile: this.selectedAudioFile,
      audioUrl : '',
      addedDate: new Date(),
      duration: this.audioDuration()
    };

    this.trackService.addTrack(newTrack).then(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/library']);
    }).catch((error) => {
      console.error('Error adding track:', error);
      this.isSubmitting.set(false);
    });

  }
  
  
}