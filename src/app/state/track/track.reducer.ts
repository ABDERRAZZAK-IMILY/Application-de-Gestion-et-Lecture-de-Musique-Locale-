import { createReducer, on } from '@ngrx/store';
import { Track } from '../../models/track.model';
import * as TrackActions from './track.actions';

export const trackFeatureKey = 'track';

export interface TrackState {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: TrackState = {
  tracks: [],
  isLoading: false,
  error: null
};

export const trackReducer = createReducer(
  initialState,
  on(TrackActions.loadTracks, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    isLoading: false
  })),
  on(TrackActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  on(TrackActions.addTrack, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(TrackActions.addTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: [...state.tracks, track],
    isLoading: false
  })),
  on(TrackActions.addTrackFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  on(TrackActions.updateTrack, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(TrackActions.updateTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: state.tracks.map(item => (item.id === track.id ? track : item)),
    isLoading: false
  })),
  on(TrackActions.updateTrackFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  on(TrackActions.removeTrack, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(TrackActions.removeTrackSuccess, (state, { id }) => ({
    ...state,
    tracks: state.tracks.filter(item => item.id !== id),
    isLoading: false
  })),
  on(TrackActions.removeTrackFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  }))
);
