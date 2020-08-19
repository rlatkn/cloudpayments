import {
    ClientRequestAbstract,
    ClientResponse,
    PaymentClientResponse,
    PaymentHistoryClientResponse,
    PaymentWith3DSClientResponse,
    PayoutClientResponse,
} from "./Client";
import {
    BaseRequest,
    BaseResponse,
    Confirm3DSRequest,
    ConfirmPaymentRequest,
    CryptogramPaymentRequest,
    CryptogramPayoutRequest,
    LinkPaymentRequest,
    PaymentGetResponse,
    PaymentHistoryResponse,
    PaymentResponse,
    PaymentWith3DSResponse,
    PayoutResponse,
    RefundPaymentRequest,
    SubscriptionCreateRequest,
    SubscriptionResponse,
    SubscriptionsListGetResponse,
    SubscriptionUpdateRequest,
    TokenPaymentRequest,
    TokenPayoutRequest,
    VoidPaymentRequest,
} from "./Api";

export class ClientApi extends ClientRequestAbstract {
    /**
     * Charge cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<PaymentWith3DSClientResponse<PaymentWith3DSResponse>>}
     */
    public async chargeCryptogramPayment(data: CryptogramPaymentRequest, requestId?: string) {
        return new PaymentWith3DSClientResponse(
            await this.call<PaymentWith3DSResponse>("/payments/cards/charge", data, requestId),
        );
    }

    /**
     * Authorize cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<PaymentWith3DSClientResponse<PaymentWith3DSResponse>>}
     */
    public async authorizeCryptogramPayment(data: CryptogramPaymentRequest, requestId?: string) {
        return new PaymentWith3DSClientResponse(
            await this.call<PaymentWith3DSResponse>("/payments/cards/auth", data, requestId),
        );
    }

    /**
     * Charge token payment
     *
     * @param {TokenPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<PaymentClientResponse<PaymentResponse>>}
     */
    public async chargeTokenPayment(data: TokenPaymentRequest, requestId?: string) {
        return new PaymentClientResponse(
            await this.call<PaymentResponse>("/payments/tokens/charge", data, requestId),
        );
    }

    /**
     * Authorize token payment
     *
     * @param {TokenPaymentRequest} data
     * @param {string} requestId
     * @returns Promise<PaymentClientResponse<PaymentResponse>>
     */
    public async authorizeTokenPayment(data: TokenPaymentRequest, requestId?: string) {
        return new PaymentClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/tokens/auth", data, requestId),
        );
    }

    /**
     * Confirm a 3DS payment
     *
     * @param {Confirm3DSRequest} data
     * @param {string} requestId
     * @returns Promise<PaymentClientResponse<PaymentResponse>>
     */
    public async confirm3DSPayment(data: Confirm3DSRequest, requestId?: string) {
        return new PaymentClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/cards/post3ds", data, requestId),
        );
    }

    /**
     * Confirm an authorized payment
     *
     * @param {ConfirmPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async confirmPayment(data: ConfirmPaymentRequest, requestId?: string) {
        return new ClientResponse(await this.call<BaseResponse>("/payments/confirm", data, requestId));
    }

    /**
     * Refund a payment
     *
     * @param {RefundPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async refundPayment(data: RefundPaymentRequest, requestId?: string) {
        return new ClientResponse(await this.call<BaseResponse>("/payments/refund", data, requestId));
    }

    /**
     * Void a payment
     *
     * @param {VoidPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async voidPayment(data: VoidPaymentRequest, requestId?: string) {
        return new ClientResponse(await this.call<BaseResponse>("/payments/void", data, requestId));
    }

    /**
     * Get a payment history
     *
     * @param {{TransactionId: number}} data
     * @returns {Promise<Response<PaymentGetResponse>>}
     */
    public async getPayment(data: BaseRequest & { TransactionId: number }) {
        return new ClientResponse(await this.call<PaymentGetResponse>("/payments/get", data));
    }

    /**
     * Find a payment by invoice id
     *
     * @param {{InvoiceId: string}} data
     * @returns Promise<PaymentClientResponse<PaymentResponse>>
     */
    public async findPaymentByInvoiceId(data: BaseRequest & { InvoiceId: string }) {
        return new PaymentClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/find", data),
        );
    }

    /**
     * @deprecated see getPaymentsList
     *
     * @param {{Date: string | Date, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentList(data: BaseRequest & { Date: string | Date; TimeZone?: string }) {
        return new PaymentHistoryClientResponse(await this.call<PaymentHistoryResponse>("/payments/list", data));
    }

    /**
     * Get a filtered payment list
     *
     * @param {{Date: string | Date, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentsList(data: BaseRequest & { Date: string | Date; TimeZone?: string }) {
        return new PaymentHistoryClientResponse(await this.call<PaymentHistoryResponse>("/payments/list", data));
    }

    /**
     * Create Order
     *
     * @param {LinkPaymentRequest} data
     * @param {string} requestId
     * @returns {Promise<Response<LinkPaymentModel>>}
     */
    public async createOrder(data: LinkPaymentRequest, requestId?: string) {
        return new ClientResponse(await this.call<BaseResponse>("/orders/create", data, requestId));
    }

    /**
     * Create Subscription
     * @param data
     * @param {string} requestId
     */
    public async createSubscription(data: BaseRequest & SubscriptionCreateRequest, requestId?: string) {
        return new ClientResponse(await this.call<SubscriptionResponse>("/subscriptions/create", data, requestId));
    }

    /**
     * Update Subscription
     * @param data
     * @param {string} requestId
     */
    public async updateSubscription(data: BaseRequest & SubscriptionUpdateRequest, requestId?: string) {
        return new ClientResponse(await this.call<SubscriptionResponse>("/subscriptions/update", data, requestId));
    }

    /**
     * Cancel Subscription
     * @param data
     * @param {string} requestId
     */
    public async cancelSubscription(data: BaseRequest & SubscriptionUpdateRequest, requestId?: string) {
        return new ClientResponse(await this.call<BaseResponse>("/subscriptions/cancel", data, requestId));
    }

    /**
     * Get Subscription
     * @param data
     */
    public async getSubscription(data: BaseRequest & { Id: string }) {
        return new ClientResponse(await this.call<SubscriptionResponse>("/subscriptions/get", data));
    }

    /**
     * Get Subscriptions List
     * @param data
     */
    public async getSubscriptionsList(data: BaseRequest & { accountId: string }) {
        return new ClientResponse(await this.call<SubscriptionsListGetResponse>("/subscriptions/find", data));
    }

    /**
     * Charge Cryptogram Payout
     *
     * @param {CryptogramPayoutRequest} data
     * @param {string} requestId
     * @returns Promise<PayoutClientResponse<PayoutResponse>>
     */
    public async chargeCryptogramPayout(data: CryptogramPayoutRequest, requestId?: string) {
        return new PayoutClientResponse<PayoutResponse>(await this.call<PayoutResponse>("/payments/cards/topup", data, requestId));
    }

    /**
     * Charge token payout
     *
     * @param {TokenPayoutRequest} data
     * @param {string} requestId
     * @returns Promise<PayoutClientResponse<PayoutResponse>>
     */
    public async chargeTokenPayout(data: TokenPayoutRequest, requestId?: string) {
        return new PayoutClientResponse<PayoutResponse>(
            await this.call<PayoutResponse>("/payments/token/topup ", data, requestId),
        );
    }
}
