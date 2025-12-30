    //set Color based on mainTag to container of done task

    const tagColors = {
      پایین: "bg-[#11A483]",
      متوسط: "bg-[#FFAF37]",
      بالا: "bg-[#FF5F37]"
    }

    export function applyDoneTaskColor(elem, tagTitle) {

      if (!elem) return
      elem.classList.remove("bg-[#FFAF37]", "bg-[#11A483]", "bg-[#FF5F37]");
      const selectedTagColor = tagColors[tagTitle]
      if(selectedTagColor) elem.classList.add(selectedTagColor);

    }