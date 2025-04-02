import React, { useState, useEffect, useRef } from "react";

function Heading() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      drawClock(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format date as DD/Month/YYYY
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  // Function to determine greeting and color
  const getGreeting = () => {
    const hours = currentTime.getHours();
    let greeting = "";
    let color = "";

    if (hours < 12) {
      greeting = "Good Morning";
      color = "green";
    } else if (hours < 18) {
      greeting = "Good Afternoon";
      color = "red";
    } else {
      greeting = "Good Night";
      color = "blue";
    }

    return { greeting, color };
  };

  const drawClock = (time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw clock center
    ctx.beginPath();
    ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    // Draw numbers on the clock
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let num = 1; num <= 12; num++) {
      const angle = ((num * 30 - 90) * Math.PI) / 180;
      const x = radius + Math.cos(angle) * (radius - 20);
      const y = radius + Math.sin(angle) * (radius - 20);
      ctx.fillText(num, x, y);
    }

    // Get time components
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Draw hands
    drawHand(ctx, radius, hours * 30 + minutes * 0.5, radius * 0.5, 6, "black"); // Hour hand
    drawHand(ctx, radius, minutes * 6, radius * 0.7, 4, "black"); // Minute hand
    drawHand(ctx, radius, seconds * 6, radius * 0.9, 2, "red"); // Second hand
  };

  const drawHand = (ctx, radius, angle, length, width, color) => {
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  };

  const { greeting, color } = getGreeting();

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {/* Greeting */}
      <h1 style={{ color }}>{greeting}</h1>

      {/* Digital Clock */}
      <h1>Digital Clock</h1>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          padding: "10px",
          border: "2px solid black",
          display: "inline-block",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        {currentTime.toLocaleTimeString()}
      </p>

      {/* Analog Clock & Date Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Analog Clock</h1>
        <canvas
          ref={canvasRef}
          width="200"
          height="200"
          style={{ border: "2px solid black", borderRadius: "50%" }}
        ></canvas>

        {/* Current Date with Border */}
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            border: "2px solid black",
            borderRadius: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            width: "180px", // Ensure width matches clock width
          }}
        >
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
}

export default Heading;

// import React, { useState, useEffect } from "react";

// function Heading() {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const hours = currentTime.getHours();
//   const minutes = currentTime.getMinutes();
//   const seconds = currentTime.getSeconds();

//   let greetings = "";
//   const customStyle = { color: "" };

//   if (hours < 12) {
//     greetings = "Good Morning";
//     customStyle.color = "green";
//   } else if (hours < 18) {
//     greetings = "Good Afternoon";
//     customStyle.color = "red";
//   } else {
//     greetings = "Good Night";
//     customStyle.color = "blue";
//   }

//   return (
//     <div>
//       <p style={customStyle}>{greetings}</p>
//       <p>
//         Current Time: {hours}:{minutes}:{seconds}
//       </p>
//     </div>
//   );
// }

// export default Heading;

// import React from "react";

// function Heading() {
//   const hours = new Date().getHours();
//   let greetings = "";
//   const customStyle = { color: "" };

//   if (hours < 12) {
//     greetings = "Good Morning";
//     customStyle.color = "green";
//   } else if (hours < 18) {
//     greetings = "Good Afternoon";
//     customStyle.color = "red";
//   } else {
//     greetings = "Good Night";
//     customStyle.color = "blue";
//   }

//   return (
//     <div>
//       <p style={customStyle}>{greetings}</p>
//       <p>{hours}</p>
//     </div>
//   );
// }

// export default Heading;
