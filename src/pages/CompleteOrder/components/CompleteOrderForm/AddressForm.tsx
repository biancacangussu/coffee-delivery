import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components/Input";
import { AddressFormContainer } from "./styles";
import { type ChangeEvent, type KeyboardEvent } from "react";

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

export function AddressForm() {
  const { register, formState, watch, setValue } = useFormContext();
  const { errors } = formState as unknown as ErrorsType;

  const cep = watch("cep");

  const handleSearchCEP = async () => {
    try {
      const onlyNumbers = cep?.replace(/\D/g, "");
      if (onlyNumbers?.length === 8) {
        const res = await fetch(`https://viacep.com.br/ws/${onlyNumbers}/json/`);
        const data = await res.json();

        if (!data.erro) {
          setValue("street", data.logradouro || "");
          setValue("district", data.bairro || "");
          setValue("city", data.localidade || "");
          setValue("uf", data.uf || "");
        }
      }
    } catch (error) {
      console.log("Erro ao buscar CEP", error);
    }
  };

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{1,3}).*/, "$1-$2");
    }
    setValue("cep", value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchCEP();
    }
  };

  return (
    <AddressFormContainer>
      <Input
        placeholder="CEP"
        type="text"
        className="cep"
        {...register("cep")}
        error={errors.cep?.message}
        onBlur={handleSearchCEP}
        onChange={handleCepChange}
        onKeyDown={handleKeyDown}
      />
      <Input
        placeholder="Rua"
        className="street"
        {...register("street")}
        error={errors.street?.message}
      />
      <Input
        type="number"
        placeholder="Número"
        {...register("number")}
        error={errors.number?.message}
      />
      <Input
        placeholder="Complemento"
        className="complement"
        {...register("complement")}
        error={errors.complement?.message}
        rightText="Opcional"
      />
      <Input
        placeholder="Bairro"
        {...register("district")}
        error={errors.district?.message}
      />
      <Input
        placeholder="Cidade"
        {...register("city")}
        error={errors.city?.message}
      />
      <Input
        placeholder="UF"
        maxLength={2}
        {...register("uf")}
        error={errors.uf?.message}
      />
    </AddressFormContainer>
  );
}
