import { FormEvent, ReactNode } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  DataPart,
  Form,
  ImagePart,
  ImagePreview,
  ContentWrapper,
  ActionsWrapper,
} from './styles';

interface FormFields {
  imageUrl: string;
  name: string;
  year: string;
  maxSpeed: string;
  economyRate: string;
  usersRate: string;
  link: string;
}

interface Props {
  initialValues: FormFields;
  children: ReactNode;
  onSubmit: (values: FormFields, e: React.FormEvent<HTMLFormElement>) => void;
}

const CarForm = ({ initialValues, children, onSubmit }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormFields;
    onSubmit(fieldValues, e);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <ContentWrapper>
        <ImagePart>
          <ImagePreview>
            <img
              src={initialValues.imageUrl}
              alt="preview da imagem do carro"
            />
          </ImagePreview>
          <Button variant="text" marginTop={1}>
            Selecionar imagem
          </Button>
        </ImagePart>

        <DataPart>
          <Input name="name" label="Nome" />
          <Input name="year" label="Ano" />
          <Input name="maxSpeed" label="Velocidade Máxima Km/h" />
          <Input name="economyRate" label="Nota economia" />
          <Input name="usersRate" label="Nota usuários" />
          <Input name="link" label="Link produto" />
        </DataPart>
      </ContentWrapper>

      <ActionsWrapper>{children}</ActionsWrapper>
    </Form>
  );
};

export default CarForm;
