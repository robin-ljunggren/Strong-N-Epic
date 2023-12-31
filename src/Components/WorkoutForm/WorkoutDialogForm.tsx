import { useState, useRef, FormEvent } from "react";
import {
  City,
  Recurring,
  Workout,
  WorkoutType,
  cities,
  recurring,
  workoutTypes,
} from "../../../Types/Workout";
import { SelectEvent, InputEvent } from "../../../Types/Form";
import styles from "./WorkoutDialogForm.module.css";
import fetchService from "../../service/fetchService";
import { useUserContext } from "../../Context/useContext";

const emptyWorkout: Workout = {
  _id: "",
  workoutType: workoutTypes[0],
  city: cities[0],
  participants: [],
  startTime: new Date(),
  maxAllowedParticipants: 0,
  recurring: recurring[0],
  durationInMin: 0,
};

export function WorkoutDialogForm(): JSX.Element {
  const [newWorkout, setNewWorkout] = useState<Workout>(emptyWorkout);

  const currnetUser = useUserContext();

  const dialogRef = useRef<HTMLDialogElement>(null);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const result: Response = await fetchService.postWorkout(
        currnetUser.details.jwt,
        newWorkout
      );
      if (result.status === 201) {
        dialogRef.current?.close();
        setNewWorkout(emptyWorkout);
      }
    } catch (err) {
      throw new Error("Wasn't able to POST a new workout");
    }
  }

  return (
    <div className={styles["dialog-container"]}>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className={styles["open-btn"]}>
        Add New Workout
      </button>
      <dialog ref={dialogRef} className={styles["workout-dialog"]}>
        <form onSubmit={handleSubmit} className={styles["workout-form"]}>
          <button
            className={styles["close-btn"]}
            type="reset"
            onClick={() => {
              setNewWorkout(emptyWorkout);
              dialogRef.current?.close();
            }}>
            &#10006;
          </button>
          <h3>Register a new Workout</h3>
          <label className={styles["workout-form-label"]}>
            Type of workout
            <select
              name="workoutType"
              value={newWorkout.workoutType}
              onChange={(e: SelectEvent) => {
                setNewWorkout({
                  ...newWorkout,
                  workoutType: e.target.value as WorkoutType,
                });
              }}>
              {workoutTypes.map(
                (type: WorkoutType): JSX.Element => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
          </label>
          <label className={styles["workout-form-label"]}>
            In which city
            <select
              name="city"
              value={newWorkout.city}
              onChange={(e: SelectEvent) => {
                setNewWorkout({
                  ...newWorkout,
                  city: e.target.value as City,
                });
              }}>
              {cities.map(
                (city: City): JSX.Element => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                )
              )}
            </select>
          </label>
          <label className={styles["workout-form-label"]}>
            Available spots:
            <input
              type="number"
              value={newWorkout.maxAllowedParticipants}
              onChange={(e: InputEvent): void => {
                setNewWorkout({
                  ...newWorkout,
                  maxAllowedParticipants: Number(e.target.value),
                });
              }}
            />
          </label>
          <label className={styles["workout-form-label"]}>
            Start Time:
            <input
              type="datetime-local"
              value={newWorkout.startTime.toLocaleString()}
              onChange={(e: InputEvent): void => {
                setNewWorkout({
                  ...newWorkout,
                  startTime: new Date(e.target.value),
                });
              }}
            />
          </label>
          <label className={styles["workout-form-label"]}>
            Duration, min:
            <input
              type="number"
              value={newWorkout.durationInMin}
              onChange={(e: InputEvent): void => {
                setNewWorkout({
                  ...newWorkout,
                  durationInMin: Number(e.target.value),
                });
              }}
            />
          </label>
          <label className={styles["workout-form-label"]}>
            Recurring:
            <select
              name="recurring"
              value={newWorkout.recurring}
              onChange={(e: SelectEvent) => {
                setNewWorkout({
                  ...newWorkout,
                  recurring: e.target.value as Recurring,
                });
              }}>
              {recurring.map(
                (recurs: Recurring): JSX.Element => (
                  <option key={recurs} value={recurs}>
                    {recurs}
                  </option>
                )
              )}
            </select>
          </label>
          <button type="submit">Create</button>
        </form>
      </dialog>
    </div>
  );
}
