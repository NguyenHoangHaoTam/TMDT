import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/common/layout/main-layout";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/login/login";
import RegisterPage from "@/pages/auth/register/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password/page";
import {
  MemberPolicyPage,
  WarrantyPolicyPage,
  PrivacyPolicyPage,
  ReturnPolicyPage,
  TermsConditionsPage,
  ConsumerDataPolicyPage,
} from "@/pages/policy";
import {
  OrderGuidePage,
  ShippingDeliveryPage,
  PaymentMethodsPage,
} from "@/pages/support";
import { AboutPage, ContactPage, CareersPage } from "@/pages/company";
import ProductDetailPage from "@/pages/product/ProductDetailPage";
import ProductListPage from "@/pages/product/ProductListPage";
import AddressPage from "@/pages/dashboard/AddressPage";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/cart/CheckoutPage";
import {
  LichNghiTetNguyenDan2024,
  ChuongTrinhGiamGiaDacBietChoDenPin,
  TimHieuNhietDoMauDenPin,
  ThongBaoNghiLe_2_9_2023,
  CuaHangBanDoCamTraiTPHCM,
  ChoThueLeuTraiDaNang,
} from "@/pages/blog";
import ProductsPage from "@/pages/admin/manage/product";
import AdminSidebar from "@/pages/admin/admin-page";
import UsersManagement from "@/pages/admin/manage/user";
import AccountInfo from "@/pages/dashboard/AccountInfo";
import VNPayReturnPage from "@/pages/payment/VNPayReturnPage";
import SharedCartListPage from "@/pages/shared-cart/SharedCartListPage";
import SharedCartDetailPage from "@/pages/shared-cart/SharedCartDetailPage";
import NotificationPage from "@/pages/notification/NotificationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },

  {
    path: "/policy/member",
    element: (
      <MainLayout>
        <MemberPolicyPage />
      </MainLayout>
    ),
  },
  {
    path: "/policy/warranty",
    element: (
      <MainLayout>
        <WarrantyPolicyPage />
      </MainLayout>
    ),
  },
  {
    path: "/policy/privacy",
    element: (
      <MainLayout>
        <PrivacyPolicyPage />
      </MainLayout>
    ),
  },
  {
    path: "/policy/return",
    element: (
      <MainLayout>
        <ReturnPolicyPage />
      </MainLayout>
    ),
  },
  {
    path: "/policy/terms",
    element: (
      <MainLayout>
        <TermsConditionsPage />
      </MainLayout>
    ),
  },
  {
    path: "/policy/consumer",
    element: (
      <MainLayout>
        <ConsumerDataPolicyPage />
      </MainLayout>
    ),
  },

  {
    path: "/support/order-guide",
    element: (
      <MainLayout>
        <OrderGuidePage />
      </MainLayout>
    ),
  },
  {
    path: "/support/shipping",
    element: (
      <MainLayout>
        <ShippingDeliveryPage />
      </MainLayout>
    ),
  },
  {
    path: "/support/payment",
    element: (
      <MainLayout>
        <PaymentMethodsPage />
      </MainLayout>
    ),
  },

  {
    path: "/about",
    element: (
      <MainLayout>
        <AboutPage />
      </MainLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <MainLayout>
        <ContactPage />
      </MainLayout>
    ),
  },
  {
    path: "/careers",
    element: (
      <MainLayout>
        <CareersPage />
      </MainLayout>
    ),
  },

  {
    path: "/products",
    element: (
      <MainLayout>
        <ProductListPage />
      </MainLayout>
    ),
  },

  {
    path: "/products/:idOrSlug",
    element: (
      <MainLayout>
        <ProductDetailPage />
      </MainLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <MainLayout>
        <CartPage />
      </MainLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <MainLayout>
        <CheckoutPage />
      </MainLayout>
    ),
  },
  {
    path: "/payment/vnpay-return",
    element: (
      <MainLayout>
        <VNPayReturnPage />
      </MainLayout>
    ),
  },

  {
    path: "/blog/lich-nghi-tet-nguyen-dan-2024",
    element: (
      <MainLayout>
        <LichNghiTetNguyenDan2024 />
      </MainLayout>
    ),
  },
  {
    path: "/blog/chuong-trinh-giam-gia-dac-biet-cho-den-pin",
    element: (
      <MainLayout>
        <ChuongTrinhGiamGiaDacBietChoDenPin />
      </MainLayout>
    ),
  },
  {
    path: "/blog/tim-hieu-nhiet-do-mau-den-pin",
    element: (
      <MainLayout>
        <TimHieuNhietDoMauDenPin />
      </MainLayout>
    ),
  },
  {
    path: "/blog/thong-bao-nghi-le-2-9-2023",
    element: (
      <MainLayout>
        <ThongBaoNghiLe_2_9_2023 />
      </MainLayout>
    ),
  },
  {
    path: "/blog/cua-hang-ban-do-cam-trai-tphcm",
    element: (
      <MainLayout>
        <CuaHangBanDoCamTraiTPHCM />
      </MainLayout>
    ),
  },
  {
    path: "/blog/cho-thue-leu-trai-da-nang",
    element: (
      <MainLayout>
        <ChoThueLeuTraiDaNang />
      </MainLayout>
    ),
  },
  {
    path: "/admin/product-manage",
    element: (
      <AdminSidebar>
        <ProductsPage />
      </AdminSidebar>
    ),
  },
  {
    path: "/admin/user-manage",
    element: (
      <AdminSidebar>
        <UsersManagement />
      </AdminSidebar>
    ),
  },

  {
    path: "/account",
    element: (
      <MainLayout>
        <AccountInfo />
      </MainLayout>
    ),
  },
  {
    path: "/account/addresses",
    element: (
      <MainLayout>
        <AddressPage />
      </MainLayout>
    ),
  },
  {
    path: "/shared-carts",
    element: (
      <MainLayout>
        <SharedCartListPage />
      </MainLayout>
    ),
  },
  {
    path: "/shared-carts/:id",
    element: (
      <MainLayout>
        <SharedCartDetailPage />
      </MainLayout>
    ),
  },
  {
    path: "/notifications",
    element: (
      <MainLayout>
        <NotificationPage />
      </MainLayout>
    ),
  },
]);

export default router;
