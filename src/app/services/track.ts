import { Injectable, inject } from '@angular/core';
import { ActionCreator, Creator, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';
import { Track } from '../models/track.model';
import * as TrackActions from '../state/track/track.actions';
import {
  selectAllTracks,
  selectTrackById,
  selectTracksError,
  selectTracksLoading
} from '../state/track/track.selectors';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private store = inject(Store);
  private actions$ = inject(Actions);

  tracks = this.store.selectSignal(selectAllTracks);
  isLoading = this.store.selectSignal(selectTracksLoading);
  error = this.store.selectSignal(selectTracksError);

  init() {
    this.store.dispatch(TrackActions.loadTracks());
  }

  addTrack(track: Track) {
    const supportedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

    if (!supportedTypes.includes(track.audioFile.type) || track.audioFile.size > 10 * 1024 * 1024) {
      this.store.dispatch(
        TrackActions.addTrackFailure({
          error: 'Audio file must be MP3, WAV, or OGG and less than 10MB in size.'
        })
      );
      return Promise.reject(new Error('Invalid audio file.'));
    }

    this.store.dispatch(TrackActions.addTrack({ track }));
    return this.waitForCompletion(TrackActions.addTrackSuccess, TrackActions.addTrackFailure);
  }

  getAllTracks(): Track[] {
    return this.tracks();
  }

  getTrackById(id: string): Track | undefined {
    return this.store.selectSignal(selectTrackById(id))();
  }

  removeTrack(id: string) {
    this.store.dispatch(TrackActions.removeTrack({ id }));
    return this.waitForCompletion(TrackActions.removeTrackSuccess, TrackActions.removeTrackFailure);
  }

  updateTrack(id: string, updatedTrack: Track) {
    const track = { ...updatedTrack, id };
    this.store.dispatch(TrackActions.updateTrack({ track }));
    return this.waitForCompletion(TrackActions.updateTrackSuccess, TrackActions.updateTrackFailure);
  }

  private waitForCompletion(
    successAction: ActionCreator<string, Creator>,
    failureAction: ActionCreator<string, Creator>
  ) {
    return new Promise<void>((resolve, reject) => {
      this.actions$.pipe(ofType(successAction, failureAction), take(1)).subscribe(action => {
        if ('error' in action) {
          reject(new Error(action.error));
        } else {
          resolve();
        }
      });
    });
  }
}
