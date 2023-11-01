export const Reporting = (entranceThrough) => {
    const totalInterest = () => {
      let result = 0;
      entranceThrough.map((through) => {
        result += through.total_interest * through.no_box;
        return result;
      });
      return result;
    };
    const totalPurchase = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.number_in_factor * currentValue.each_price;
      }, 0);
      return result;
    };

    const totalBeforeDiscount = () => {
      const result = entranceThrough.reduce((total, current) => {
        return total + current.total_purchase_currency_before;
      }, 0);
      return result;
    };

    const totalDiscount = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.discount_value;
      }, 0);
      return result;
    };
    const totalBonusValue = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.bonus_value;
      }, 0);
      return result;
    };
    const totalSell = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.total_sell;
      }, 0);
      return result;
    };

    const totalInterester = (
      totalSell() +
      totalBonusValue() +
      totalDiscount() -
      totalBeforeDiscount()
    ).toFixed(1);
    return ({
      number: entranceThrough.length,
      total_before_discount: totalBeforeDiscount().toFixed(1),
      total_discount: totalDiscount().toFixed(1),
      total: 0,
      total_bonous_value: totalBonusValue().toFixed(1),
      total_interest: totalInterester,
      total_interest_percent: (
        (totalInterester / totalBeforeDiscount()) *
        100
      ).toFixed(1),
      sell_total: totalSell().toFixed(1),
      purchase_total: totalPurchase(),
      purchase_after_discount: totalPurchase() - totalDiscount(),
      grandTotal: totalBeforeDiscount() - totalDiscount(),
    });
  };