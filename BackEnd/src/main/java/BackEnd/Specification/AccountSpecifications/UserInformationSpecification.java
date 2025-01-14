package BackEnd.Specification.AccountSpecifications;

import BackEnd.Entity.AccountEntity.UserInformation;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
@AllArgsConstructor
public class UserInformationSpecification implements Specification<UserInformation> {

    @NonNull
    private String field;

    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<UserInformation> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("notHaveAccount")) {
            return criteriaBuilder.isNull(root.get("account"));
        }

        if (field.equalsIgnoreCase("fullnameOrPhoneNumber")) {
            Predicate fullnamePredicate = criteriaBuilder.like(root.get("fullname"), "%" + value + "%");
            Predicate phoneNumberPredicate = criteriaBuilder.like(root.get("phoneNumber"), "%" + value + "%");
            return criteriaBuilder.or(fullnamePredicate, phoneNumberPredicate);
        }


        return null;
    }

    public static Specification<UserInformation> buildWhere(String search) {
        Specification<UserInformation> where = new UserInformationSpecification("notHaveAccount", null);

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            UserInformationSpecification phoneSpec = new UserInformationSpecification("fullnameOrPhoneNumber", search);
            where = where.and(phoneSpec);

        }

        return where;
    }
}
