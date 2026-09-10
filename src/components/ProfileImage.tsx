import type { Component } from "solid-js";
import profile from "../assets/optimized/profile.webp";

const ProfileImage: Component = () => (
  <div class="relative">
    <img
      src={profile}
      alt="Marino Gomez"
      width="512"
      height="512"
      fetchpriority="high"
      class="aspect-square w-full rounded-full border border-base-content/20 bg-base-200 p-2"
    />
    <span
      class="absolute -right-2 -bottom-2 hidden h-16 w-16 rounded-full border border-base-content/20 md:block"
      aria-hidden="true"
    />
  </div>
);

export default ProfileImage;
