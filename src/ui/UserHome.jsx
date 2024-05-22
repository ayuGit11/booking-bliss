import React, { useCallback, useState } from "react";
import { useTransition, animated, config } from "@react-spring/web";

const AnimatedImage = ({ url, alt, index, currentIndex }) => {
  const props = useTransition(currentIndex === index, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
    config: config.gentle,
  });

  return props((style, item) =>
    item ? (
      <animated.img
        style={{
          ...style,
          maxHeight: "800px",
          width: "100%",
          objectFit: "cover",
        }}
        src={url}
        alt={alt}
      />
    ) : null
  );
};

const images = [
  {
    alt: "cabins",
    url: "/cabins.jpg",
    description:
      "Cozy cabins surrounded by nature. Perfect for a peaceful getaway, these cabins offer a comfortable stay with all modern amenities. Enjoy the serenity and beauty of the natural surroundings. Whether you're planning a romantic retreat or a family vacation, these cabins provide an ideal setting. With easy access to hiking trails, fishing spots, and other outdoor activities, you can immerse yourself in nature. The rustic charm of the cabins is complemented by modern conveniences, ensuring a comfortable stay. Each cabin is designed to blend seamlessly with the environment, providing a unique and immersive experience.",
  },
  {
    alt: "view",
    url: "/view.jpg",
    description:
      "Breathtaking mountain view. Wake up to the stunning scenery of mountains and valleys. The perfect spot for nature lovers and adventurers seeking a picturesque landscape. The area is known for its beautiful sunrises and sunsets, offering a visual treat. You can explore nearby trails that offer different perspectives of the landscape. The tranquility of the mountains is perfect for meditation and relaxation. Whether you're a photographer, an artist, or simply a nature enthusiast, you'll find endless inspiration here. The clear, crisp air and the sound of nature create a perfect environment for unwinding.",
  },
  {
    alt: "swimmingPool",
    url: "/swimmingPool.jpeg",
    description:
      "Luxury swimming pool. Take a dip in our state-of-the-art swimming pool. Whether you want to relax or get a workout, our pool provides the ideal environment. The pool area is designed with comfort and style in mind, featuring comfortable loungers and shaded areas. The water is crystal clear and maintained at the perfect temperature. Enjoy poolside service with refreshing drinks and light snacks. The serene atmosphere around the pool makes it a great spot for reading or just soaking up the sun. Our pool is equipped with modern filtration systems to ensure the highest standards of cleanliness.",
  },
  {
    alt: "dining",
    url: "/dining.jpg",
    description:
      "Fine dining experience. Savor gourmet meals prepared by top chefs in a beautiful dining setting. Our restaurant offers a variety of dishes to suit all tastes. The menu features locally sourced ingredients and seasonal specials. Enjoy a selection of fine wines and handcrafted cocktails. The ambiance is perfect for romantic dinners, family gatherings, or special celebrations. Our attentive staff ensures that every dining experience is memorable. From appetizers to desserts, each dish is crafted with care and attention to detail. Indulge in a culinary journey that combines traditional flavors with modern techniques.",
  },
];

export default function UserHome() {
  const [index, setIndex] = useState(0);

  const goToNextImage = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const transitions = useTransition(index, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
    config: config.gentle,
  });

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "var(--color-orange-200)",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {transitions((style, item) => {
          const image = images[item];
          if (!image) return null;
          const { url, alt, description } = image;
          return (
            <>
              <AnimatedImage
                key={item}
                url={url}
                alt={alt}
                index={item}
                currentIndex={index}
                style={{ ...style, position: "absolute", top: 0, left: 0 }}
              />
              <animated.div
                style={{
                  ...style,
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "100%",
                  textAlign: "left",
                  lineHeight: "2",
                  fontFamily: "Salina, sans-serif",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                {description}
              </animated.div>
            </>
          );
        })}
        <button
          onClick={goToNextImage}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          click here to explore more➡️
        </button>
      </div>
    </div>
  );
}
