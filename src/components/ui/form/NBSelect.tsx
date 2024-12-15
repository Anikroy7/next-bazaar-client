import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    id: string;
    name: string;
  }[];
}

export default function NBSelect({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
}: IProps) {
  const { register } = useFormContext();

  return (
    <Select
      isRequired
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      defaultSelectedKeys={[options[0].id.toString() || "No category found!!"]}
      isDisabled={disabled}
      label={label}
      placeholder="Select a category"
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.id}>{option.name}</SelectItem>
      ))}
    </Select>
  );
}

/* 

<Select
      isRequired
      className="max-w-xs"
      defaultSelectedKeys={["cat"]}
      label="Favorite Animal"
      placeholder="Select an animal"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
*/
