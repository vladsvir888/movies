import getOffset from "~/utils/getOffset";

const show = (tooltip) => {
  document.body.append(tooltip);
  document
    .querySelector(".tooltip")
    ?.animate({ opacity: [0, 1] }, { duration: 350 });
};

const hide = () => {
  document.querySelector(".tooltip")?.remove();
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", {
    mounted(el, binding) {
      if (!binding.value || !binding.value.value) {
        return;
      }

      const { top, left } = getOffset(el);

      const offsetTop = 5;
      const offsetLeft = 32;
      const styles = {
        position: "absolute",
        top: `${top - offsetTop}px`,
        left: `${left + offsetLeft}px`,
        "z-index": 100,
        padding: "8px",
        color: "#000",
        "background-color": "#fff",
        "font-size": "14px",
        "border-radius": "5px",
        ...binding?.value?.styles,
      };

      const tooltipElement = document.createElement("span");
      tooltipElement.classList.add("tooltip");
      tooltipElement.role = "tooltip";
      tooltipElement.textContent = `${binding.value.value}`;

      for (let key in styles) {
        tooltipElement.style[key] = styles[key];
      }

      el.addEventListener("mouseover", () => show(tooltipElement));
      el.addEventListener("mouseout", hide);
    },

    unmounted(el) {
      el.removeEventListener("mouseover", () => show(tooltipElement));
      el.removeEventListener("mouseout", hide);
    },
  });
});
