
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ToastAndroid,
  FlatList,
} from 'react-native';
import styles from './myOrders/style';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Api from '../apiSecure/Api';

import dayjs from 'dayjs';

export const MyOrders = ({
  navigation: {goBack},
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);
  
  const getItems = async () => {
    setIsloading(true);
    const response = await Api.get(
      `http://ec2-18-198-161-12.eu-central-1.compute.amazonaws.com:5000/api/orderByCustomer/${cart.userInfo.username}`,
    );
    const res = response.data;
    setIsloading(false);
    return res;
  };
  const [isLoading, setIsloading] = useState(false);
  const fetchMenuItems = async () => {
    
    const ordArr = [];
    const histArr = [];
    const items: any = await getItems();
    items.map((item: any) => {
      if (item.status == 'Готов') {
        histArr.push(item);
      } else {
        ordArr.push(item);
      }
    });
    setHistory(histArr);
    setOrders(ordArr);

    console.log(isLoading);
  };
  const navigation = useNavigation();
  const [pay, setPay] = useState('а мне похуй');
  const [histPay, setHistPay] = useState('а мне похуй');
  const payWordFuncHist = (item: any) => {
    let payWord;
    if (item.paymentType == 0) {
      payWord = 'Наличными';
    } else if (item.paymentType == 1) {
      payWord = 'Картой онлайн';
    } else if (item.paymentType == 2) {
      payWord = 'Картой';
    }

    setHistPay(payWord);
  };
  const anFunc = item => {
    let newTitle;
    if (item.title?.length > 7) {
      let name = item.title.substr(0, 6);
      newTitle = name + '...';
    } else {
      newTitle = item.title;
    }
  };
  const payWordFunc = () => {
    let payWord;
    if (cart.paymentType == 0) {
      payWord = 'Наличными';
    } else if (cart.paymentType == 1) {
      payWord = 'Картой онлайн';
    } else if (cart.paymentType == 2) {
      payWord = 'Картой';
    }

    setPay(payWord);
  };
  useEffect(() => {
    fetchMenuItems();

    payWordFunc();
  }, []);

  const cart = useSelector(state => state.dishes);
  console.log(cart.userInfo.username,'ddddddddddDDDDDDDD');
  const [state, setState] = useState(true);

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.Arrow}
            source={require('../../img/arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Мои заказы</Text>
      </View>
      <TouchableOpacity
        style={styles.switcher}
        onPress={() => setState(!state)}>
        {state == true ? (
          <View style={styles.rowSwitcher}>
            <View style={styles.switchBut}>
              <Text style={styles.trueText}>Текущие</Text>

            </View>
            <Text style={styles.inActText}>История</Text>
          </View>
        ) : (
          <View style={styles.rowSwitcher}>
            <Text style={styles.inActText}>Текущие</Text>
            <View style={styles.switchButHist}>
              <Text style={styles.trueText}>История</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      {state === true ? (
        <View>
          {orders?.length ? (
            <View>
              <FlatList
                style={styles.flex}
                data={orders}
                refreshing={isLoading}
                onRefresh={getItems}
                renderItem={({item}: {item: any}) => {
                  console.log(item, 'itemitemitem');
                  return (
                    <>
                      <View style={styles.orderType}>
                        <View style={styles.flexWrapper}>
                          <View style={styles.flexEnd}>
                            <Text style={styles.color}>ТИП ЗАКАЗА</Text>
                            <Text style={styles.color}>ДАТА</Text>
                            <Text style={styles.color}>ВРЕМЯ</Text>
                            {item.OrderDishes?.length ? (
                              <Text style={styles.color}>ОПЛАТА</Text>
                            ):(
                              <></>
                            )}
                            <Text style={styles.color}>СТАТУС</Text>
                          </View>
                          <View>
                            <Text style={styles.simpText}>
                              {item.delivery_method}
                            </Text>
                            <Text style={styles.simpText}>
                              {dayjs(item.delivery_date).format('DD-MM-YYYY')}
                            </Text>
                            <Text style={styles.simpText}>
                              {dayjs(item.delivery_date).format('HH:mm')}
                            </Text>
                            {item.OrderDishes?.length ? (
                              <Text style={styles.simpText}>{pay}</Text>
                            ):(
                              <></>
                            )}
                            
                            <Text style={styles.simpText}>{item.status}</Text>
                          </View>
                        </View>
                      </View>
                      {item.OrderDishes?.length ? (
                        <View style={styles.orderDishes}>
                      
                        <View style={styles.rowWrapper}>
                          <Text style={styles.color}>БЛЮДО</Text>
                          <Text style={styles.color}>ЦЕНА</Text>
                          <Text style={styles.color}>КОЛ-ВО</Text>
                          <Text style={styles.color}>СУММА</Text>
                        </View>
                        <View
                          style={{
                            paddingTop: 15,
                            borderBottomColor: '#979A9F',
                            borderBottomWidth: 0.3,
                          }}
                        />
                        {item.OrderDishes?.length ? (
                          item.OrderDishes.map((item: any) => {
                            console.log(item,'itemitemitemitemitemitemitemitemitemitemitem');
                            let newTitle;
                            if (item.Dish.title.length > 15) {
                              let name = item.Dish.title.substr(0, 15);
                              newTitle = name + '...';
                              console.log(newTitle);
                            } else {
                              newTitle = item.Dish.title;
                            }
                            console.log(item,'fuck you costia');
                            return (
                              <View>
                                <View style={styles.contContent} key={item.id}>
                                  <Text
                                    numberOfLines={3}
                                    style={styles.simpTextTitle}>
                                    {newTitle}
                                  </Text>
                                  <Text style={styles.Price}>
                                    {' '}
                                    {item.Dish.price} BYN
                                  </Text>
                                  <Text style={styles.Qan}>
                                    {' '}
                                    {item.quantity}
                                  </Text>
                                  <Text style={styles.simpText}>
                                    {item.Dish.price * item.quantity} BYN
                                  </Text>
                                </View>
                              </View>
                            );
                          })
                        ) : (
                          <></>
                        )}
                        <View
                          style={{
                            paddingTop: 15,
                            borderBottomColor: '#979A9F',
                            borderBottomWidth: 0.3,
                          }}
                        />
                        {item.OrderDishes?.length ? (
                          <View style={styles.TotalCounter}>
                            <Text style={styles.finHardText}>ИТОГО</Text>
                            <Text style={styles.finText}>
                              {item.total_price} BYN
                            </Text>
                          </View>
                        ):(
                          <></>
                        )}
                          

                        
                      </View>
                      ):(
                        <></>
                      )}
                      
                    </>
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.EmptyTextWrapper}>
              <Text style={styles.EmptyText}>У вас нет текущих заказов</Text>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
              </TouchableOpacity>
              <FlatList
                style={styles.flexHistory}
                data={orders}
                refreshing={isLoading}
                onRefresh={getItems}
                renderItem={() => {
                  return <></>;
                }}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          {history?.length ? (
            <FlatList
              style={styles.size}
              data={history}
              renderItem={({item}) => {
                payWordFuncHist(item);
                return (
                  <View style={styles.orderType} key={item.id}>
                    <View style={styles.flexWrapper}>
                      <View style={styles.flexEnd}>
                        <Text style={styles.color}>ТИП ЗАКАЗА</Text>
                        <Text style={styles.color}>ДАТА</Text>
                        <Text style={styles.color}>ВРЕМЯ</Text>
                        <Text style={styles.color}>ОПЛАТА</Text>
                      </View>
                      <View>
                        <Text style={styles.simpText}>{item.delivery_method}</Text>
                        <Text style={styles.simpText}>
                          {dayjs(item.date).format('DD-MM-YYYY')}
                        </Text>
                        <Text style={styles.simpText}>
                          {dayjs(item.date).format('HH:mm')}
                        </Text>
                        <Text style={styles.simpText}>{pay}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View style={styles.EmptyTextWrapper}>
              <Text style={styles.EmptyTextHist}>
                Ваша история заказов пуста
              </Text>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.ButText}> ПЕРЕЙТИ В МЕНЮ </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
