"use client";

import Padder from "@/components/Padder";
import { FC } from "react";

const Form: FC = () => {
  return (
    <>
      <form
        id="demonstration-form"
        action="/demonstration"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();

          console.log("Form submitted");
        }}
      >
        <Padder>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            name="login"
            defaultValue="pier-paolo@pasolini.org"
          />
        </Padder>

        <Padder>
          <label htmlFor="password">Pwd</label>
          <input
            type="password"
            name="password"
            defaultValue="pierpaolopassu"
          />
        </Padder>
      </form>

      <Padder>
        <button form="demonstration-form" type="submit">
          Sumbit
        </button>
      </Padder>
    </>
  );
};

export default Form;
