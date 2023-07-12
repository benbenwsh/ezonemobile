import React from "react";
import Heroes from "../components/Heroes";
import Features from "../components/features/Features";
import HotItemImgRight from "../components/HotItemImgRight/HotItemImgRight";
import HotItemImgLeft from "../components/HotitemImgLeft/HotItemImgLeft";

export function Home() {
  return (
    <>
      <Heroes />
      <Features />
      <div className="container">
        <hr class="featurette-divider" />
        <HotItemImgRight />
        <hr class="featurette-divider" />
        <HotItemImgLeft />
        <hr class="featurette-divider" />
        <HotItemImgRight />
      </div>
    </>
  );
}
