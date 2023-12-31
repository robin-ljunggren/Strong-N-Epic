import { NavLink } from "react-router-dom";
import { workoutTypes } from "../../Types/Workout.js";
import { cities } from "../../Types/Workout.js";
import { PageHeader } from "../Components/PageHeader/PageHeader.js";
import styles from "./styles/HomePage.module.css";

export function HomePage(): JSX.Element {
  return (
    <>
      <PageHeader />
      <div className={styles["logRegContainer"]}>
        <NavLink to={"/register"} className={styles["logRegBtn"]}>
          Register
        </NavLink>
        <NavLink to={"/login"} className={styles["logRegBtn"]}>
          Login
        </NavLink>
      </div>
      <article style={{ textAlign: "center" }}>
        <h1>
          Welcome to the Strong-N-Epic Gym: Where We Turn Keyboard Warriors into
          Iron Warriors!
        </h1>
        <p>
          Hey there, fearless trolls of the interwebs! 🖥️ Are your "gym
          sessions" limited to lifting bags of chips and slamming energy drinks?
          Well, it's time to upgrade those puny muscles and transform into the
          ultimate meme machine! 💥
        </p>
        <br />
        <p>
          At Strong-N-Epic, we've designed a workout plan that's as epic as your
          online roasts! 😂 Prepare to sweat, grunt, and flex your way to a
          whole new level of trolling supremacy. Here's what to expect:
        </p>
        {workoutTypes.map((type) => {
          return <p key={type}>{type}</p>;
        })}
        <br />
        <p>
          So, gear up, grab your keyboard, and join Strong-N-Epic Gym today.
          We're not just building muscles; we're building memes that will go
          down in internet history. Get ready to flex your way to victory while
          looking fabulous doing it! 💪😎
        </p>
        <br />
        <p>
          Our locations: <br />
          {cities.map((city) => {
            return ` ${city} `;
          })}
        </p>
      </article>
    </>
  );
}
