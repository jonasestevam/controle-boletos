import React, {useCallback, useEffect, useRef, useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  CheckboxContainer,
  Container,
  InputContainer,
  StepContainer,
  Text,
} from './styles';

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {Checkbox} from '../../components/Checkbox';
import {ControlledTextInput} from '../../components/ControlledTextInput';
import {DatePicker} from '../../components/DatePicker';
import {Header} from '../../components/Header';
import {TabNavigator} from '../../components/TabNavigator';
import {IBoleto, TPeriod} from '../../models/boleto.model';
import {useStoreBoletos} from '../../services/BoletosService';
import theme from '../../theme';
const controlledFormSchema = yup.object({
  price: yup.string().required('Informe o valor do boleto'),
  description: yup.string().max(25).required('Informe uma descrição'),
});

const AddBoleto = ({navigation, route}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IBoleto>({
    resolver: yupResolver(controlledFormSchema),
  });
  const priceInputRef = useRef<TextInput>();
  const descriptionInputRef = useRef<TextInput>();
  const [pagerRef, setPagerRef] = useState<PagerView | null>();
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [isEdition, setIsEdition] = useState<boolean>(false);
  const [period, setPeriodo] = useState<TPeriod>('MONTHLY');

  const saveBoleto = useStoreBoletos(state => state.save);
  const editBoleto = useStoreBoletos(state => state.edit);
  const curentBoletosList = useStoreBoletos(state => state.boletos);

  const handlePageSelect = (event: PagerViewOnPageSelectedEvent) => {
    setCurrentPageIndex(event.nativeEvent.position);
    const page = event.nativeEvent.position + 1;

    switch (page) {
      case 1:
        if (priceInputRef.current) {
          priceInputRef.current?.focus();
          priceInputRef.current?.setNativeProps({
            selection: {start: 4, end: 4},
          });
          setTimeout(() => {
            priceInputRef.current?.setNativeProps({
              selection: null,
            });
          }, 1);
        }
        break;
      case 2:
        if (descriptionInputRef.current) {
          descriptionInputRef.current.focus();
        }
    }
  };

  const handlePriceInputSubmit = () => {
    goToPage(1);
  };

  const handleDescriptionInputSubmit = () => {
    goToPage(2);
  };

  const goToPage = useCallback(
    (page: number) => pagerRef?.setPage(page),
    [pagerRef],
  );

  const handleAddBoleto = (data: IBoleto) => {
    let isRecurrent = true;
    if (period !== 'MONTHLY') {
      isRecurrent = false;
    }
    const inputData: IBoleto = {...data, period, isRecurrent, dueDate};

    if (isEdition) {
      editBoleto(inputData);
    } else {
      saveBoleto(curentBoletosList, inputData);
    }
    Toast.show({
      type: 'success',
      text1: 'Boleto salvo!',
      text2: 'Você receberá uma notificação na data do vencimento 😉',
      visibilityTime: 3500,
    });
    navigation.pop();
  };

  const tabsConfig: string[] = [
    'Valor',
    'Descrição',
    'Vencimento',
    'Recorrência',
  ];

  const handleOnTabTap = (page: number) => {
    setCurrentPageIndex(page);
    pagerRef?.setPage(page);
  };

  useEffect(() => {
    if (errors.description) {
      return goToPage(1);
    }
    if (errors.price) {
      return goToPage(0);
    }
  }, [errors, goToPage]);

  const setBoletoToEdit = (boletoToEdit: IBoleto) => {
    setValue('id', boletoToEdit.id);
    setDueDate(new Date(boletoToEdit.dueDate));
    setPeriodo(boletoToEdit.isRecurrent ? 'MONTHLY' : 'ONCE');
    setValue('price', boletoToEdit.price);
    setValue('description', boletoToEdit.description);
  };

  useEffect(() => {
    if (route.params && route.params.boletoToEdit) {
      setBoletoToEdit(route.params.boletoToEdit);
      setIsEdition(true);
    }

    if (route.params && route.params.month && route.params.year) {
      const date = new Date();
      date.setMonth(route.params.month);
      date.setFullYear(route.params.year);
      setDueDate(date);
    }
  }, [route.params]);

  return (
    <>
      <Header
        onSavePress={handleSubmit(handleAddBoleto)}
        onBackPress={() => {
          navigation.pop();
        }}
      />
      <TabNavigator
        tabsTitle={tabsConfig}
        activePageIndex={currentPageIndex}
        onTabTap={handleOnTabTap}
      />
      <Container
        initialPage={0}
        onPageSelected={handlePageSelect}
        ref={ref => setPagerRef(ref)}>
        <StepContainer key="1">
          <Text>Qual o valor da conta?</Text>
          <InputContainer>
            <ControlledTextInput
              error={errors.price}
              currency
              forwardedRef={priceInputRef}
              onSubmitEditing={handlePriceInputSubmit}
              returnKeyType="next"
              name="price"
              control={control}
              blurOnSubmit={false}
              keyboardType="numeric"
              selectionColor={theme.COLORS.white}
              maxLength={16}
            />
          </InputContainer>
        </StepContainer>

        <StepContainer key="2">
          <Text>Dê uma descrição...</Text>
          <InputContainer>
            <ControlledTextInput
              error={errors.description}
              forwardedRef={descriptionInputRef}
              onSubmitEditing={handleDescriptionInputSubmit}
              returnKeyType="next"
              name="description"
              control={control}
              blurOnSubmit={false}
              selectionColor={theme.COLORS.white}
              maxLength={25}
            />
          </InputContainer>
        </StepContainer>

        <StepContainer key="3">
          <Text>Quando é o vencimento?</Text>
          <InputContainer>
            <DatePicker onDateChange={setDueDate} value={dueDate} />
          </InputContainer>
        </StepContainer>

        <StepContainer key="4">
          <Text>Qual a recorrência do pagamento?</Text>

          <CheckboxContainer>
            <Checkbox
              selected={period === 'ONCE'}
              text="UMA VEZ"
              onPress={() => {
                if (period === 'ONCE') return;
                setPeriodo('ONCE');
              }}
            />
            <Checkbox
              selected={period === 'MONTHLY'}
              text="TODO MÊS"
              onPress={() => {
                if (period === 'MONTHLY') return;
                setPeriodo('MONTHLY');
              }}
            />
            {/* <Checkbox
              selected={period === 'WEEKLY'}
              text="TODA SEMANA"
              onPress={() => {
                if (period === 'WEEKLY') return;
                setPeriodo('WEEKLY');
              }}
            /> */}
          </CheckboxContainer>
        </StepContainer>
      </Container>
    </>
  );
};
export default AddBoleto;
