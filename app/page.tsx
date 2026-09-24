import { SpatialHome } from "@/components/canvas/SpatialHome";
import { StackedHome } from "@/components/canvas/StackedHome";

/**
 * Voxlo's homepage is one large drawing. Desktop with motion gets the board
 * the camera travels across (see lib/canvas/world.ts for the composition);
 * small screens and prefers-reduced-motion get the stacked composition.
 * The switch is pure CSS so neither layout flashes before hydration, and the
 * hidden one is display:none — out of the accessibility tree entirely.
 */
export default function HomePage() {
  return (
    <>
      <div className="board-wrap">
        <SpatialHome />
      </div>
      <div className="stack-wrap">
        <StackedHome />
      </div>
    </>
  );
}
