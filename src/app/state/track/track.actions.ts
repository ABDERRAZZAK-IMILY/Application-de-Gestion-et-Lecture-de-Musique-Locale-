import { createAction, props } from '@ngrx/store';
import { Track } from '../../models/track.model';

export const loadTracks = createAction('[Track] Load Tracks');
export const loadTracksSuccess = createAction(
  '[Track] Load Tracks Success',
  props<{ tracks: Track[] }>()
);
export const loadTracksFailure = createAction(
  '[Track] Load Tracks Failure',
  props<{ error: string }>()
);

export const addTrack = createAction('[Track] Add Track', props<{ track: Track }>());
export const addTrackSuccess = createAction('[Track] Add Track Success', props<{ track: Track }>());
export const addTrackFailure = createAction(
  '[Track] Add Track Failure',
  props<{ error: string }>()
);

export const updateTrack = createAction('[Track] Update Track', props<{ track: Track }>());
export const updateTrackSuccess = createAction(
  '[Track] Update Track Success',
  props<{ track: Track }>()
);
export const updateTrackFailure = createAction(
  '[Track] Update Track Failure',
  props<{ error: string }>()
);

export const removeTrack = createAction('[Track] Remove Track', props<{ id: string }>());
export const removeTrackSuccess = createAction(
  '[Track] Remove Track Success',
  props<{ id: string }>()
);
export const removeTrackFailure = createAction(
  '[Track] Remove Track Failure',
  props<{ error: string }>()
);
