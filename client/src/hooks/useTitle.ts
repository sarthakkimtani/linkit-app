import { useLayoutEffect } from "react";

function useTitle(title: string) {
  useLayoutEffect(() => {
    document.title = title;
  });
}

export default useTitle;
