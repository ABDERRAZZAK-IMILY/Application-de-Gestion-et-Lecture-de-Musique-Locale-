import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { StorageService } from '../../services/storage';
import * as TrackActions from './track.actions';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);
  private storage = inject(StorageService);

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      switchMap(() =>
        from(this.storage.getAll()).pipe(
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(() =>
            of(TrackActions.loadTracksFailure({ error: 'Failed to load tracks.' }))
          )
        )
      )
    )
  );

  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      switchMap(({ track }) =>
        from(this.storage.add(track)).pipe(
          map(() => TrackActions.addTrackSuccess({ track })),
          catchError(() =>
            of(TrackActions.addTrackFailure({ error: 'Failed to add track.' }))
          )
        )
      )
    )
  );

  updateTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.updateTrack),
      switchMap(({ track }) =>
        from(this.storage.update(track.id, track)).pipe(
          map(() => TrackActions.updateTrackSuccess({ track })),
          catchError(() =>
            of(TrackActions.updateTrackFailure({ error: 'Failed to update track.' }))
          )
        )
      )
    )
  );

  removeTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.removeTrack),
      switchMap(({ id }) =>
        from(this.storage.delete(id)).pipe(
          map(() => TrackActions.removeTrackSuccess({ id })),
          catchError(() =>
            of(TrackActions.removeTrackFailure({ error: 'Failed to delete track.' }))
          )
        )
      )
    )
  );
}
