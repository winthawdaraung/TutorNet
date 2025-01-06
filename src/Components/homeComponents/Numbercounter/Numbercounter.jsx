import React from "react";
import CountUp from "react-countup";
const Numbercounter = () => {
  return (
    <div className="bg-teal-500  text-white py-12">
      <div className="container grid grid-cols-2 md:grid-cols-3 gap-99">
        <div className="text-center flex flex-col items-center justify-center">
          <p className="font-medium">Tutors</p>
          <p className="text-3xl font-semibold">
            <CountUp
              start={0}
              end={579}
              duration={3}
              delay={0.5}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
        </div>

        <div className="text-center flex flex-col items-center justify-center">
          <p className="font-medium">Active Student</p>
          <p className="text-3xl font-semibold">
            <CountUp
              start={0}
              end={39873}
              separator=","
              suffix="+"
              duration={3}
              delay={0.5}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
        </div>

        <div className="text-center flex flex-col items-center justify-center">
          <p className="font-medium">Subject</p>
          <p className="text-3xl font-semibold">
            <CountUp
              start={0}
              end={21}
              separator=","
              suffix="+"
              duration={3}
              delay={0.5}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default Numbercounter;
