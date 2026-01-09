import { Component, computed, inject, signal } from "@angular/core";
import { TrackService } from "../../services/track";
import { Track } from "../../models/track.model";
import { RouterLink } from "@angular/router";
import { AudioPlayerService } from "../../services/audio-player";

@Component({
    selector: 'app-library',
    imports: [],
    templateUrl: './library.html',
    styleUrl: './library.css',
})
export class Library {

trackService = inject(TrackService);
audioPlayer = inject(AudioPlayerService);


setClicked(){
  this.audioPlayer.isclicked.set(true);
}



searchQuery = signal<string>('');

selectedGenre = signal<string>('all');


tracks = signal<Track[]>([]);


tracksloaded = computed(() => {
  return this.trackService.getAllTracks();
});


  
 filteredTracks = computed(() => {
  const query = this.searchQuery().toLowerCase();
  const genre = this.selectedGenre();
  const tracks = this.trackService.getAllTracks();

  return tracks.filter((track: Track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query);

    const matchesGenre =
      genre === 'all' || track.genre === genre;

    return matchesSearch && matchesGenre;
  });
});



onPlayTrack(track: Track,  event: Event) {
  event.stopPropagation();
  this.audioPlayer.playTrack(track);
}
    
}
